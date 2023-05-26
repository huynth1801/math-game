import { _decorator, Component, director, Node, tween, Vec3, find} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {

    private onPlayClick() : void {
        director.loadScene('Game');
    }

}
