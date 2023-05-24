import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property({
        type: Node
    })
    private muteBtn: Node;

    @property({
        type: Node
    })
    private unMuteBtn: Node;

    @property({
        type: Label
    })
    private equation: Label;

    public get Equation() : Label {
        return this.equation
    }
    
    public set Equation(equation : Label) {
        this.equation = equation;
    }
    
    private onMuteClick(): void {
        this.muteBtn.active = false;
        this.unMuteBtn.active = true;
    }

    private onUnMuteClick(): void {
        this.muteBtn.active = true;
        this.unMuteBtn.active = false;
    }
}

