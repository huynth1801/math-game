import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;
import { GameView } from './GameView';

@ccclass('MenuController')
export class MenuController extends Component {
    private gameView: GameView;

    private onPlayClick() : void {
        
        director.loadScene("Game")
    }
}

