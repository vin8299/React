import React, { Component } from 'react';
import { Breadcrumb,BreadcrumbItem, Form, FormGroup, Col, Label, Input, Button, FormFeedback} from 'reactstrap';
import { Link } from 'react-router-dom'


class Contact extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstname : "",
            lastname : "",
            areacode : "",
            telnum : "",
            email : "",
            agree : false,
            message : "",
            contactType : "Tel.",
            touched : {
                firstname : false,
                lastname : false,
                email: false,
                telnum: false   
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    };

    handleInputChange(event){
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    };

    handleSubmit(event){
        alert("Current state is : " + JSON.stringify(this.state))
        event.preventDefault();
    };

    handleReset(event){

        this.setState({
            firstname : "",
            lastname : "",
            areacode : "",
            telnum : "",
            email : "",
            agree : false,
            message : "",
            contactType : "Tel."
        });
        event.preventDefault();
    };

    handleBlur = (field) => (event) => {
        this.setState({
            touched : {...this.state.touched, [field] : true}
        });
    }

    validate(firstname, lastname, telnum, email){
        const errors = {
            firstname : "",
            lastname : "",
            telnum : "",
            email : ""
        }
        if(this.state.touched.firstname && firstname.length<1)
            errors.firstname = "This must not be empty";
        if(this.state.touched.lastname && lastname.length<1)
            errors.lastname = "This must not be empty";
        const reg = /^\d[10]$/;
        if(this.state.touched.telnum && !reg.test(telnum))
            errors.telnum = "Telephone number should contain 10 digits";
        const regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(this.state.touched.email && !regemail.test(email))
            errors.email = "Email is not valid";

        return errors;
    }

    render(){
        const errors = this.validate(this.state.firstname,this.state.lastname,this.state.telnum,this.state.email);

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                        </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname" placeholder="First Name"
                                        value={this.state.firstname} onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('firstname')} 
                                        valid={errors.firstname === ""}
                                        invalid={errors.firstname !== ""} required/>
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname" placeholder="Last Name"
                                        value={this.state.lastname} 
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('lastname')}
                                        valid={errors.lastname === ""}
                                        invalid={errors.lastname !== ""} required/>
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telnum" md={2}>Telephone No.</Label>
                                <Col md={3}>
                                    <Input type="number" id="areacode" name="areacode" placeholder="Code"
                                        value={this.state.areacode} onChange={this.handleInputChange} required/>
                                </Col>
                                <Col md={7}>
                                    <Input type="number" id="telnum" name="telnum" placeholder="Telephone No."
                                        value={this.state.telnum} onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('telnum')}
                                        valid={errors.telnum === ""}
                                        invalid={errors.telnum !== ""} required/>
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>E-mail</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email" placeholder="E-mail"
                                        value={this.state.email} onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('email')}
                                        valid={errors.email === ""}
                                        invalid={errors.email !== ""} required/>
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size : 6, offset : 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" checked={this.state.agree} onChange={this.handleInputChange}/>{' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size : 3, offset :1}}>
                                    <Input type="select" name="contactType" value={this.state.contactType} onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>E-mail</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message" row="10"
                                        value={this.state.message} onChange={this.handleInputChange} required/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">Send Feedback</Button> {"  "}
                                    <Button type="reset" color="danger" onClick={this.handleReset}>Reset</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );   
    }
}

export default Contact;