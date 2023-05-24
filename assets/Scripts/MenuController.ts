import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {

    private onPlayClick() : void {
        director.loadScene("Game")
    }
}

