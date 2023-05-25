import { _decorator, Color, Component, director, math, Node, random, sys, ProgressBar, Vec3, tween, easing } from 'cc';
const { ccclass, property } = _decorator;
import { GameView } from './GameView';
import { Constants } from './Constants';

@ccclass('GameController')
export class GameController extends Component {
    @property({
        type: GameView
    })
    private gameView: GameView;

    @property({
        type: ProgressBar
    })
    private timeProcess: ProgressBar;

    private progress: number;
    private logicGame: Boolean = true;
    private currScore: number = 0;
    private localScore: number = 0;
    private maxScore: number = 0;

    private playingTime(): void {
        this.progress = this.timeProcess.progress;
        if (this.progress > 0) {
            this.progress -= Constants.gameSpeed;
        }
        else {
            this.progress = 1;
        }
        this.timeProcess.progress = this.progress;
    }

    protected onLoad(): void {
        if (!sys.localStorage.getItem(Constants.highestScoreKey)) {
            sys.localStorage.setItem(Constants.highestScoreKey, this.currScore.toString());
        }
        this.generateEquation();
        this.gameView.bgSprite.color.set(math.randomRangeInt(10,255),math.randomRangeInt(1,255),math.randomRangeInt(1,255),math.randomRangeInt(100,255));
    }

    protected update(): void {
        this.playingTime();
        this.playingTime();
        // console.log(this.progress);
        if (this.progress < 0.01) {
            this.showResults();
        }
    }

    private generateEquation(): void {
        let a = math.randomRangeInt(0,100);
        let b = math.randomRangeInt(0,100);
        let result = a + b;
        let resultRandom = this.randomizeBetweenTwoNumbers(result, math.randomRangeInt(0,100));
        this.gameView.Equation.string = a.toString() + '+' + b.toString() + '=' + resultRandom.toString();
        this.logicGame = result === resultRandom ? true : false;
    }

    private randomizeBetweenTwoNumbers(a, b): number {
        return Math.random() < 0.5 ? a : b;
    }

    private onCheckBtn(dt: number): void {
        if (this.logicGame) {
            this.timeProcess.progress = 1;
            this.setScore();
            this.generateEquation();
            this.gameView.rightAudio.play();
        } else {
            this.timeProcess.progress = 0;
            this.gameView.wrongAudio.play();
            this.gameView.correctIcon.active = false;
            this.gameView.wrongIcon.active = true;
            this.showResults();
        }
    }

    private onCrossBtn(): void {
        if(this.logicGame === false) {
            this.timeProcess.progress = 0;
            this.setScore();
            this.generateEquation();
            this.gameView.rightAudio.play();
        } else {
            this.timeProcess.progress = 1;
            this.gameView.wrongIcon.active = false;
            this.gameView.correctIcon.active = true;
            console.log(this.gameView.correctIcon.active);
            this.gameView.wrongAudio.play();
            this.showResults();
        }
    }

    public setScore(): void {
        this.currScore++;
        this.gameView.Score.string = this.currScore.toString();
    }

    private showResults(): void {
        this.timeProcess.node.active = false;
        this.gameView.scoreBoard.active = true;
        this.localScore = parseInt(sys.localStorage.getItem(Constants.highestScoreKey));
        this.maxScore = Math.max(this.localScore, this.currScore);
        sys.localStorage.setItem(Constants.highestScoreKey, this.maxScore.toString());
        this.gameView.currScore.string = this.currScore.toString();
        this.gameView.bestScore.string = this.maxScore.toString();
    }

    private onRestartClick(): void {
        this.timeProcess.progress = 1;
        this.timeProcess.node.active = true;
        this.gameView.scoreBoard.active = false;
        this.generateEquation();
        this.currScore = 0;
        this.gameView.Score.string = this.currScore.toString();
    }

    private onSettingClick(): void {
        // let backgroundX = this.gameView.bgPositon.;
        // let backgroundY = this.gameView.bgPositon.position.y;
       
        director.loadScene('Menu');
    }
}

