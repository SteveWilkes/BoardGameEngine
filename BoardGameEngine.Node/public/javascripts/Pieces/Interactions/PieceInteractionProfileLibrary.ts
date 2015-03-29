module AgileObjects.BoardGameEngine.Pieces {

    export class PieceInteractionProfileLibrary {
        static INSTANCE = new PieceInteractionProfileLibrary();

        private _profileIdsBySignature: Ts.IStringDictionary<string>;
        private _profilesById: Ts.IStringDictionary<P.PieceInteractionProfile>;
        private _currentProfileId: number;

        constructor() {
            this._profileIdsBySignature = <Ts.IStringDictionary<string>>{};
            this._profilesById = <Ts.IStringDictionary<P.PieceInteractionProfile>>{};
            this._currentProfileId = 0;
        }

        public getIdOrAdd(
            profileSignature: string,
            profileFactory: (signature: string) => P.PieceInteractionProfile): string {

            if (!this._profileIdsBySignature.hasOwnProperty(profileSignature)) {
                this._profileIdsBySignature[profileSignature] = (++this._currentProfileId).toString();
            }

            var profileId = this._profileIdsBySignature[profileSignature];
            if (!this._profilesById.hasOwnProperty(profileId)) {
                this._profilesById[profileId] = profileFactory(profileSignature);
            }

            return profileId;
        }

        public get(profileId: string) {
            return this._profilesById[profileId];
        }
    }
}