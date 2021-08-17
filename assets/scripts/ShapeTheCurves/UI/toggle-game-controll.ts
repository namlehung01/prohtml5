
import { _decorator, Component, Node } from 'cc';
import ShapeManager from '../shape-manager';
import ShapeSetting, { GAME_CONTROLL_TYPE } from '../shape-setting';
const { ccclass, property } = _decorator;

@ccclass('ToggleGameControll')
export class ToggleGameControll extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
        this.UpdateToggle();
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    OnButtonToggleClick(event:Event, customData:string)
    {
        ShapeManager.instance.OnSettingToggleTouch(customData);
        this.UpdateToggle();
    }
    UpdateToggle()
    {
        let type = ShapeSetting.instance.GetGameControllType();
        let acitvetoggle = (type==GAME_CONTROLL_TYPE.DRAG?"drag":"tap");
        for(let i = 0;i<this.node.children.length;i++)
        {
            let checkmark:Node = this.node.children[i].getChildByName("Checkmark");
            if(checkmark)
            {
                if(this.node.children[i].name == acitvetoggle )
                {
                    checkmark.active = true;
                }
                else
                {
                    checkmark.active = false;
                }
            }
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
