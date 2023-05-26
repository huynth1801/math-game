import { _decorator, Color, Component, director, math, Node, random, sys, ProgressBar, Vec3, tween, easing, find } from 'cc';
const { ccclass, property } = _decorator;
import { GameView } from './GameView';
import { Constants } from './Constants';
import { Store } from './Store';

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
        this.passSoundVolume();
        tween(this.gameView.sceneTr)
          .to(0, {position: new Vec3(154.812,0,0) },{easing: 'cubicInOut'})
          .call(()=>console.log('hello'))
          .to(0.7, {position: new Vec3(154.812,512,0) },{easing: 'cubicInOut'})
          .start();

        if (!sys.localStorage.getItem(Constants.highestScoreKey)) {
            sys.localStorage.setItem(Constants.highestScoreKey, this.currScore.toString());
        }
    }

    private passSoundVolume(): void {
        let store = find('StoreVolume').getComponent(Store);
        this.gameView.rightAudio.volume = store.storeVolume.valueOf();
        this.gameView.wrongAudio.volume = store.storeVolume.valueOf();
        this.gameView.startUpAudio.volume = store.storeVolume.valueOf();
        this.gameView.startUpAudio.play();
        this.gameView.muteBtn.active = store.storeVolume.valueOf() === 1;
        this.gameView.unMuteBtn.active = !this.gameView.muteBtn.active;
    }

    protected start(): void {
        this.generateEquation();
        this.gameView.bgSprite.color.set(math.randomRangeInt(10,255),math.randomRangeInt(1,255),math.randomRangeInt(1,255),math.randomRangeInt(100,255));
    }

    protected update(): void {
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
            this.gameView.wrongAudio.play();
            this.showResults();
        }
    }

    public setScore(): void {
        this.currScore++;
        this.gameView.Score.string = this.currScore.toString();
    }

    private showResults(): void {
        if (this.logicGame) {
            this.gameView.wrongIcon.active = false;
            this.gameView.correctIcon.active = true;
        } else {
            this.gameView.wrongIcon.active = true;
            this.gameView.correctIcon.active = false;
        }
        this.gameView.answerBtn.active = false
        this.timeProcess.node.active = false;
        this.gameView.scoreBoard.active = true;
        this.localScore = parseInt(sys.localStorage.getItem(Constants.highestScoreKey));
        this.maxScore = Math.max(this.localScore, this.currScore);
        sys.localStorage.setItem(Constants.highestScoreKey, this.maxScore.toString());
        this.gameView.currScore.string = this.currScore.toString();
        this.gameView.bestScore.string = this.maxScore.toString();
    }

    private onRestartClick(): void {
        this.gameView.answerBtn.active = true;
        this.timeProcess.progress = 1;
        this.timeProcess.node.active = true;
        this.gameView.scoreBoard.active = false;
        this.generateEquation();
        this.currScore = 0;
        this.gameView.Score.string = this.currScore.toString();
    }

    private onSettingClick(): void {
        director.loadScene('Menu');
    }

    private onMuteClick(): void {
        this.gameView.rightAudio.volume = 0;
        this.gameView.wrongAudio.volume = 0;
        let store = find('StoreVolume').getComponent(Store);
        store.storeVolume = 0;
        this.gameView.muteBtn.active = false;
        this.gameView.unMuteBtn.active = true;
    }

    private onUnMuteClick(): void {
        this.gameView.rightAudio.volume = 1;
        this.gameView.wrongAudio.volume = 1;
        let store = find('StoreVolume').getComponent(Store);
        store.storeVolume = 1;
        this.gameView.muteBtn.active = true;
        this.gameView.unMuteBtn.active = false;
    }
}

