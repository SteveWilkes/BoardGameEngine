module AgileObjects.TypeScript.Evaluation {

    interface IEntityDataFactory {
        matcherFactory: (anyPropertyNamePattern: string, entityName: string) => RegExp;
        replacementFactory: (entityName: string) => string;
    }

    var entityDataFactories: IStringDictionary<IEntityDataFactory> = {
        "p": {
            matcherFactory: (anyPropertyNamePattern: string, entityName: string) =>
                new RegExp(anyPropertyNamePattern + entityName + "(?:=([0-9,a-zA-Z\\.\\:]+))?(\\+|\\||\\)|$)", "g"),
            replacementFactory: (entityName: string) => "pe{$1" + entityName + ",[$2]}$3"
        },
        "bm": {
            matcherFactory: (anyPropertyNamePattern: string, entityName: string) =>
                new RegExp(anyPropertyNamePattern + entityName + "\\b", "g"),
            replacementFactory: (entityName: string) => "bme{$1" + entityName + "}"
        }
    };

    export class EvaluatorPatternMapperBase extends EvaluatorPatternExpanderBase implements IEvaluatorPatternMapper {
        private _matchersByReplacement: IStringDictionary<RegExp>;
        private _entityData: Array<EntityData>;

        constructor(entityData: Array<EntityData>) {
            super(entityData);

            var i, propertyNames = new Array<string>();
            for (i = 0; i < entityData.length; i++) {
                if (entityData[i].type === "p") {
                    propertyNames.push(entityData[i].name);
                }
            }

            var anyPropertyNamePattern = "\\b((?:(?:" + propertyNames.join("|") + ")\\.)*)";
            this._matchersByReplacement = {};

            for (i = 0; i < entityData.length; i++) {
                var type = entityData[i].type;
                if (!entityDataFactories.hasOwnProperty(type)) { continue; }

                var entityDataFactory = entityDataFactories[type];
                var entityName = entityData[i].name;
                var matcher = entityDataFactory.matcherFactory(anyPropertyNamePattern, entityName);
                var replacement = entityDataFactory.replacementFactory(entityName);

                this._matchersByReplacement[replacement] = matcher;
            }

            this._entityData = entityData;
        }

        public with(annotationNamesBySymbol: Ts.IStringDictionary<string>): IEvaluatorPatternMapper {
            var entityData = this._entityData.slice(0);

            for (var symbol in annotationNamesBySymbol) {
                entityData.push(new TypeScript.Evaluation.EntityData(symbol, annotationNamesBySymbol[symbol], "p"));
            }

            return new EvaluatorPatternMapperBase(entityData);
        }

        public map(pattern: string): string {
            var expandedPattern = this.expand(pattern);

            for (var replacement in this._matchersByReplacement) {
                expandedPattern = expandedPattern.replace(this._matchersByReplacement[replacement], replacement);
            }

            return expandedPattern;
        }
    }
}