import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments, postComment, campsiteId }) {
    if (comments) {
        return (
            <div class="col-md-5 m-1">
                <h4>Comments</h4>
                {
                    comments.map((comment) => {
                        return (
                            <p key={comment.id}>{comment.text}
                                <br />
                                --{comment.author}, {new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', date: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                            </p>)
                    })
                }
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        );
    }
    return <div />
}

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            author: '',
            text: '',
            touched: {
                rating: false,
                author: false
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit (values) {
       
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }



    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>

                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control"
                                    validators={
                                        isNumber
                                    }
                                >
                                    <option>Select one</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors
                                    className="text-danger"
                                    model=".rating"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        isNumber: 'A rating is required',
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea model=".text" id="text" name="text"
                                    rows="6"
                                    className="form-control"
                                />
                            </div>


                            <div className="form-group">
                                <Button type="submit" color="primary">Submit</Button>
                            </div>

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}


function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments} 
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    }
    return <div />;
}

export default CampsiteInfo;