import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes : state.dishes,
        comments : state.comments,
        promotions : state.promotions,
        leaders : state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment :(dishId, author, rating,comment) => dispatch(addComment(dishId, author, rating,comment)),
    fetchDishes : () => {dispatch(fetchDishes())}
}); 
class Main extends Component{
	constructor(props)
    {
		super(props);
        
    }
    componentDidMount(){
        this.props.fetchDishes();
        console.log("Main didmount is called")
    }
    
    render(){
        console.log("Main render is called")

        const AboutPage =(props) =>{
                    return(
                        <About leaders={this.props.leaders} />
                    );
        };

        const DishWithId = ({match}) =>{
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading = {this.props.dishes.isLoading}
                errMess = {this.props.dishes.errMess}
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                addComment={this.props.addComment} />
            );
};
        
        const HomePage = (props) =>{
            return(
                    <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                        dishesLoading = {this.props.dishes.isLoading}
                        dishesErrMess = {this.props.dishes.errMess}
                        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                        leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
                );
        };
          return (
                <div>
                    <Header />
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));