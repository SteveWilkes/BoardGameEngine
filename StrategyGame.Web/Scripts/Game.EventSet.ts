module AgileObjects.StrategyGame.Game {
    export class EventSet {
        public containerResized = new AgileObjects.TypeScript.EventHub<Board>();

        public teamLoaded = new AgileObjects.TypeScript.EventHub<Team>();

        public pieceSelected = new AgileObjects.TypeScript.EventHub<BoardTile>();
        public pieceMoving = new AgileObjects.TypeScript.EventHub<BoardTile>();
        public pieceMoved = new AgileObjects.TypeScript.EventHub<BoardTile>();
        public pieceDeselected = new AgileObjects.TypeScript.EventHub<BoardTile>();
    }
} 