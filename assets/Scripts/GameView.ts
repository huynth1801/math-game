import { _decorator, AudioSource, Component, Label, Node, Sprite } from 'cc';
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
        type: Node
    })
    private BgPositon: Node;
    public get bgPositon(): Node {
        return this.BgPositon;
    }
    public set bgPositon(value: Node) {
        this.BgPositon = value;
    }


    @property({
        type: Sprite
    })
    private BgSprite: Sprite;
    public get bgSprite(): Sprite {
        return this.BgSprite;
    }
    public set bgSprite(value: Sprite) {
        this.BgSprite = value;
    }

    @property({
        type: Label
    })
    private equation: Label;

    public get Equation() : Label {
        return this.equation
    }

    @property({
        type: Label
    })
    private score: Label;
    public get Score(): Label {
        return this.score;
    }
    public set Score(value: Label) {
        this.score = value;
    }
    
    public set Equation(equation : Label) {
        this.equation = equation;
    }

    @property({
        type: Node
    })
    private ScoreBoard: Node;
    public get scoreBoard(): Node {
        return this.ScoreBoard;
    }
    public set scoreBoard(value: Node) {
        this.ScoreBoard = value;
    }

    @property({
        type: Label
    })
    private CurrScore: Label;
    public get currScore(): Label {
        return this.CurrScore;
    }
    public set currScore(value: Label) {
        this.CurrScore = value;
    }

    @property({
        type: Label
    })
    private BestScore: Label;
    public get bestScore(): Label {
        return this.BestScore;
    }
    public set bestScore(value: Label) {
        this.BestScore = value;
    }

    @property({ type: AudioSource })
    private RightAudio: AudioSource;
    public get rightAudio(): AudioSource {
        return this.RightAudio;
    }
    public set rightAudio(value: AudioSource) {
        this.RightAudio = value;
    }
    

    @property({ type: AudioSource })
    private WrongAudio: AudioSource;
    public get wrongAudio(): AudioSource {
        return this.WrongAudio;
    }
    public set wrongAudio(value: AudioSource) {
        this.WrongAudio = value;
    }

    @property({
        type: Node
    })
    private CorrectIcon: Node;
    public get correctIcon(): Node {
        return this.CorrectIcon;
    }
    public set correctIcon(value: Node) {
        this.CorrectIcon = value;
    }

    @property({
        type: Node
    })
    private WrongIcon: Node;
    public get wrongIcon(): Node {
        return this.WrongIcon;
    }
    public set wrongIcon(value: Node) {
        this.WrongIcon = value;
    }

    private onMuteClick(): void {
        this.rightAudio.volume = 0;
        this.wrongAudio.volume = 0;
        this.muteBtn.active = false;
        this.unMuteBtn.active = true;
    }

    private onUnMuteClick(): void {
        this.rightAudio.volume = 1;
        this.wrongAudio.volume = 1;
        this.muteBtn.active = true;
        this.unMuteBtn.active = false;
    }
}

