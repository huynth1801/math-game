import { _decorator, Component, math, Node, random, View } from 'cc';
const { ccclass, property } = _decorator;
import { GameView } from './GameView';

@ccclass('GameController')
export class GameController extends Component {
    @property({
        type: GameView
    })
    private gameView: GameView;

    protected onLoad(): void {
        this.Equation();
    }

    private Equation(): void {
        let a = math.randomRangeInt(0,100);
        let b = math.randomRangeInt(0,100);
        let result = a + b;
        let resultRandom = this.randomizeBetweenTwoNumbers(result, math.randomRangeInt(0,100));
        // console.log(this.gameView.equation);
        this.gameView.Equation.string = a.toString() + '+' + b.toString() + '=' + resultRandom.toString();
    }

    private randomizeBetweenTwoNumbers(a, b): number {
        return Math.random() < 0.5 ? a : b;
    }

    private onCheckBtn(): void {

    }

    private onCrossBtn(): void {
        
    }
}

