module AgileObjects.Angular.Directives {
    class TabSet {
        private _headings: Array<JQuery>;
        private _tabs: Array<JQuery>;
        private _activeTabIndex: number;

        constructor(tabSetParent: ng.IAugmentedJQuery) {
            this._headings = tabSetParent.children("h4").map(function () { return $(this); }).get();
            this._tabs = new Array<JQuery>();

            tabSetParent[0].classList.add("tabsContainer");

            var nextTabHeading = this._headings[0];
            for (var i = 0; i < this._headings.length; i++) {
                var heading = this._headings[i];
                var content = heading.next("div");

                var headingElement = heading[0];
                headingElement["_index"] = i;
                headingElement.classList.add("tabHeading");
                headingElement.addEventListener("click", (e: MouseEvent) => {
                    this.showTab(e.target["_index"]);
                });

                if (i > 0) {
                    heading.insertAfter(nextTabHeading);
                    nextTabHeading = heading;
                }

                var contentElement = content[0];
                contentElement.classList.add("tabContent");

                this._tabs.push(content);
            }

            this.showTab(0);
        }

        public showTab(tabIndex: number): void {
            if (tabIndex === this._activeTabIndex) { return; }
            for (var i = 0; i < this._tabs.length; i++) {
                this._headings[i][0].classList.remove("active");
                this._tabs[i].hide();
            }
            this._headings[tabIndex][0].classList.add("active");
            this._tabs[tabIndex].show();
            this._activeTabIndex = tabIndex;
        }
    }

    interface ITabSetScope extends ng.IScope {
        tabs: TabSet;
    }

    export function addTabs(angularModule: ng.IModule): void {
        angularModule
            .directive("tabs", () => {
                return {
                    restrict: "A",
                    scope: {},
                    link: ($scope: ITabSetScope, element: ng.IAugmentedJQuery) => {
                        $scope.tabs = new TabSet(element);
                    }
                };
            });
    }
}