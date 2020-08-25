import React, {Component} from "react";
import UpdateProgramPopup from "./updateProgramPopup";
import UpdatePromotionPopup from "./updatePromotionPopup";


class UpdatePopup extends Component {
    // constructor(props) {
    //     super(props);
    //
    // }

    updateProgram=(program)=>{

        const newData = [...this.props.init.newProgramTiers];
        const index = newData.findIndex(item => program.programId === item.programId);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...program,
        });

        this.props.onChangeProgram(newData);
    }

    updatePromotion=(promotion)=>{
        // console.log(promotion);

        const newData = [...this.props.init.newPromotionTiers];
        const index = newData.findIndex(item => promotion.promotionId === item.promotionId);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...promotion,
        });

        this.props.onChangePromotion(newData);
    }

    render(){

        let programComponents = [];
        let promotionComponents = [];

        if(this.props.init.programTiers !== undefined){
            this.props.init.programTiers.forEach((program, i) => {
                let programComp = [];
                programComp.push(
                    <UpdateProgramPopup key={i} program={program} tier={this.props.diff.tierDetails} update={this.updateProgram}/>
                )

                programComponents.push(programComp);
            })
        }

        if(this.props.init.promotionTiers !== undefined) {
            this.props.init.promotionTiers.forEach((promotion, i) => {
                let promotionComp = [];
                promotionComp.push(
                    <UpdatePromotionPopup key={i} promotion={promotion} tier={this.props.diff.tierDetails} update={this.updatePromotion}/>
                )

                promotionComponents.push(promotionComp);
            })
        }

        return(
            <div>
                <h3>Program</h3>
                <div className='ant-row custom-modal-tier-header'>
                    <div className='ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-24 ant-col-xl-12'>
                        Current
                    </div>
                    <div className='ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-24 ant-col-xl-12'>
                        New
                    </div>
                </div>
                    {programComponents}

                <h3>Promotion</h3>
                <div className='ant-row custom-modal-tier-header'>
                    <div className='ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-24 ant-col-xl-12'>
                        Current
                    </div>
                    <div className='ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-24 ant-col-xl-12'>
                        New
                    </div>
                </div>
                    {promotionComponents}
            </div>
        );
    }

}

export default UpdatePopup;