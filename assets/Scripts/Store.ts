import { _decorator, Component, Node, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Store')
export class Store extends Component {
    @property({
        type: CCInteger,
      })
    private StoreVolume: number = 1;
    public get storeVolume(): number {
        return this.StoreVolume;
    }
    public set storeVolume(value: number) {
        this.StoreVolume = value;
    }
}

