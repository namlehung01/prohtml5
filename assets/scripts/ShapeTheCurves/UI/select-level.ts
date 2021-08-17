
import { _decorator, Component, Node, Prefab, EventHandler } from 'cc';
import ShapeLevel from '../shape-level';
import ShapeManager from '../shape-manager';
const { ccclass, property } = _decorator;

@ccclass('SelectLevel')
export class SelectLevel extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(cc.Prefab)
    PrefabButtonLevel:Prefab = null;

    levelUnlocked:number = 10;
    start () {
        // [3]
        this.GenerateButtonLevel();
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
    GenerateButtonLevel()
    {
        let numberLevel = ShapeLevel.instance.LEVELDATA.length;
        if(this.PrefabButtonLevel != null)
        {
            let col = 4;
            let row = Math.floor(numberLevel/col) + (numberLevel%col>0?1:0);
            let btnW = 80;
            let btnH = 50;
            let lineW = 50;
            let lineH = 50;
            let posx = -(col/2)*(lineW + btnW);
            if(numberLevel < col)
            {
                posx = -(numberLevel/2)*(lineW + btnW);
            }
            let posy = (row/2)*(lineH + btnH);
            for(let i = 0;i<numberLevel;i++)
            {
                let tnode = cc.instantiate(this.PrefabButtonLevel);
                
                tnode.name = ShapeLevel.instance.LEVELDATA[i].levelName;
                let x = posx + (i%col)*(lineW + btnW) + (lineW + btnW)/2;
                let y = posy - Math.floor(i/col)*(lineH + btnH) - (lineH + btnH)/2;

                this.node.addChild(tnode);
                tnode.setContentSize(btnW,btnH);
                tnode.setPosition(x,y);

                let childnode = tnode.getChildByName('text');
                childnode.setContentSize(btnW,btnH);
                childnode.getComponent("cc.Label").string = tnode.name;

                let button = tnode.getComponent("cc.Button");
                let event =  new EventHandler();
                event.target = this.node;
                event.component = 'SelectLevel';
                event.handler = 'btn_SelectedLevel';
                event.customEventData = '' + i;
                button.clickEvents.push(event);
                if(i > this.levelUnlocked)
                {
                    button.interactable = false;
                }
            }
        }
    }

    btn_SelectedLevel(event: any,customEventData: string)
    {
        console.log('SelectedLevel: ' + customEventData);
        ShapeManager.instance.LoadLevel(Number.parseInt(customEventData));
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
