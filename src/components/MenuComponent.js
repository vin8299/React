import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
import DishDetail from './DishDetailComponent';

class Menu extends Component{
	constructor(props){
		super(props);
		
		this.state = {
            selectedDish : null
		}
        console.log("Constructor has been initiated.")
	}
    
    onDishSelect(dish){
        this.setState({ selectedDish : dish })
    }
    componentDidMount(){
        console.log("componentDidMount has been initiated.")
    }
    

    

	render(){
            console.log("Render has been initiated.")
		const menu = this.props.dishes.map((dish) => {
			return(
				<div key={dish.id} className="col-12 col-md-5 m-1">
					<Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width='100%' src={dish.image} alt={dish.name} />
						<CardImgOverlay className="ml-5">
							<CardTitle>{dish.name}</CardTitle>
						</CardImgOverlay>
					</Card>
				</div>
				);
		});

		return(
				<div className="container">
					<div className="row">
							{menu}
					</div>
                    <DishDetail dish={this.state.selectedDish} />
				</div>
			);
	}
}

export default Menu;