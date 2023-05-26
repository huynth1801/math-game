import { _decorator, Component, director, Node, AudioSource, find} from 'cc';
const { ccclass, property } = _decorator;
import { Store } from './Store';

@ccclass('MenuController')
export class MenuController extends Component {
    private store : Store;

    @property({
        type: Node
    })
    private muteBtn: Node;

    @property({
        type: Node
    })
    private unMuteBtn: Node;

    protected onLoad(): void {
        if (find('StoreVolume') === null)
        {
            const storeVolumeNode = new Node('StoreVolume');
            director.addPersistRootNode(storeVolumeNode);
            this.store = storeVolumeNode.addComponent(Store);
        }
        else 
        {
            this.store = find('StoreVolume').getComponent(Store);
        }

        let paramsMain = this.store.storeVolume.valueOf();
        this.muteBtn.active = paramsMain === 1;
        this.unMuteBtn.active = paramsMain !== 1;
    }

    private onPlayClick() : void {
        director.loadScene('Game');
    }

    // Click to unmute 1
    private onMuteClick(): void {
        this.setSoundState(false);
    }

    private onUnMuteClick(): void {
        this.setSoundState(true);
    }

    private setSoundState(isSoundOn: boolean): void {
        this.muteBtn.active = isSoundOn;
        this.unMuteBtn.active = !isSoundOn;
        this.store.storeVolume = isSoundOn ? 1 : 0;
    }

}
