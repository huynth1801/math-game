import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Constants')
export class Constants extends Component {
    public static readonly highestScoreKey = 'Highest score';
    public static readonly gameSpeed = 0.002; 
}

