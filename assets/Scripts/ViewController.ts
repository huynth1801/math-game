import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ViewController')
export class ViewController extends Component {
    @property({
        type: Node
    })
    private muteBtn: Node;

    @property({
        type: Node
    })
    private unMuteBtn: Node;

    private onMuteClick(): void {

    }

    private onUnMuteClick(): void {

    }
}

