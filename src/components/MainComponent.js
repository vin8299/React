import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect} from 'react-router-dom'

class Main extends Component{
	constructor(props)
    {
		super(props);
        
        this.state ={
            dishes : DISHES,
            leaders : LEADERS,
            promotions : PROMOTIONS,
            comments : COMMENTS
        }
    }
    
    render(){

        const AboutPage =(props) =>{
                    return(
                        <About leaders={this.state.leaders} />
                    );
        };

        const DishWithId = ({match}) =>{
            return(
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
            );
};
        
        const HomePage = (props) =>{
            return(
                    <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                        leader={this.state.leaders.filter((leader) => leader.featured)[0]}/>
                );
        };
          return (
                <div>
                    <Header />
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
                        <Route path='/menu/:dishId' component={DishWithId}  />
                        <Route path='/aboutus' component={AboutPage} />
                        <Route path='/contactus' component={Contact} />
                        <Redirect to='/home' />
                    </Switch>
                    <Footer />
                </div>
  );
    }
}

export default Main;