import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem,Breadcrumb,
    Modal, ModalBody,ModalHeader,Button, Label, Col, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const minLength = (len) => (val) => !(val) || (val.length>=len);

class CommentForm extends Component {

        constructor(props){
            super(props);

            this.state = {
                isModalOpen : false
            }
            this.toggleModal = this.toggleModal.bind(this);
        }
        toggleModal(){
            this.setState({
                isModalOpen : !this.state.isModalOpen
            });
        }
        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.author,values.rating, values.comment);
            console.log(this.props.dishId, values.rating, values.author, values.comment)
        }


        render(){
            return(
                <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Comment Form
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                </Col>
                                <Col md={12}>
                                <Control.select model=".rating" name="rating" id="rating"
                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="author">Your Name</Label>
                                </Col>
                                <Col md={12}>
                                <Control.text model=".author" name="author" id="author"
                                className="form-control"
                                placeholder="Your Name" 
                                validators ={{
                                    required, minLength : minLength(2)
                                }}/>
                                <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required : "Required",
                                        minLength : "Length should be greater than 2"
                                    }}

                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="comment">Comment</Label>
                                </Col>
                                <Col md={12}>
                                <Control.textarea model=".comment" name="comment" id="comment"
                                className="form-control"
                                rows= "6" />
                                </Col>
                            </Row>
                            <Button color="primary" type="submit">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button onClick={this.toggleModal} outline><span className="fa fa-pencil"></span> Submit Comment</Button>
                </div>

            );
        }


    }

    function RenderDish({dish, isLoading, errMess}){
        if (dish!=null){
            return(
                <Card>
                    <CardImg width='100%' src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
    function RenderComment({comments, addComment, dishId}){
            if(comments!=null){
                      
                       const comm = comments.map((comment) => {
                           
                                return(
                                    <div key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author} , 
                                        {
                                            new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: '2-digit'
                                                    }).format(new Date(comment.date))
                                        }
                                        <br/ >{comment.rating} star
                                        </p>
                                    
                                    </div>
                                    
                                ) 
                });
                return(
                    <div>
                        <h2>Comments</h2>
                        <div>{comm}</div>
                        <CommentForm dishId={dishId} addComment={addComment}/>
                    </div>
                );
                
                
            }
        else{
            return(
                <div></div>
            );
        }
    }
    
    const DishDetail=(props) => {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        {props.errMess}
                    </div>
                </div>
            );
        }
        else
        {return(
            <div className="container">
					<div className="row">
						<Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
						</Breadcrumb>
						<div className="col-12">
                            <h3>{props.dish.name}</h3>
							<hr />
						</div>
					</div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComment comments={props.comments} 
                    addComment={props.addComment}
                    dishId={props.dish.id}/>
                </div>
            </div>
            </div>
           );} 
    }

export default DishDetail;