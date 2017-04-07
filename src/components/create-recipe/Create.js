import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import * as fields from './form-fields';
import Ingredients from './Ingredients';
import validate from './validate'
import $ from 'jquery';


import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

const {imageUrlField, recipeNameField, prepTimeField, cookTimeField, servingsField, difficultyField, descriptionField, instructionsField} = fields

class Create extends Component {
  constructor() {
    super()
    this.state = {
      tags: [], 
      tag: ''
    }
  }

  handleChange(tags) {
    this.setState({tags})
  }

  handleChangeInput(tag) {
    this.setState({tag})
  }

  componentDidMount() {
    $(document).ready(function() {
      $("#preview-image").on("load", function(){
        $(this).parent().removeClass('image-preview');
        $(this).parent().addClass('image-preview-load');
      })
      $("#preview-image").on("error", function(){
          $(this).attr('src', '');         
      });
      $("#image-input").on("input", function(){
        $(this).val() === '' ? $('#image-container').addClass('image-preview'): null         
      });
    });
  }
  renderAlert() {
    if (this.props.submitFailed) {
      return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Error:</strong> You should check in on some of those fields below.
        </div>
      );
    }
  }

  handleFormSubmit(formProps) {
    const { username } = this.props
    const { recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description } = formProps
    const { tags } = this.state
    const ingredients = Object.keys(formProps).reduce((list, val, i) => {
      let [quantity, items] = [`quantity${i}`, `items${i}`]
      formProps[quantity] ? list.quantity.push(formProps[quantity]) : null;
      formProps[items] ? list.items.push(formProps[items]) : null;
      return list
    }, {quantity: [], items: []})
    this.props.postRecipe({
      recipeName, 
      imageUrl, 
      difficulty, 
      cookTime, 
      prepTime, 
      servings, 
      instructions, 
      description, 
      ingredients, 
      username,
      tags
    })
  }

  render() {
    console.log(this.state)
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      {this.renderAlert()}
      <div className="flex-body spaced">
        <div className="create-flex-element-left">
          <Field name="recipeName" component={recipeNameField} />
          <Field name="description" component={descriptionField} />
          Ingredients:
          <Ingredients />
          <Field name="instructions" component={instructionsField} />   
          <TagsInput 
            value={this.state.tags} 
            onChange={this.handleChange.bind(this)}
            inputValue={this.state.tag}
            onChangeInput={this.handleChangeInput.bind(this)}
            />            
        </div>
        <div className="create-flex-element-right">
          <Field name="imageUrl" component={imageUrlField} />
          <div className="inner-flex-body">
          <div className="inner-flex-element">
          <Field name="prepTime" component={prepTimeField} />
          </div>
          <div className="inner-flex-element">
          <Field name="cookTime" component={cookTimeField} />
          </div>
          </div>
          <Field name="servings" component={servingsField} />
          <Field name="difficulty" component={difficultyField} />
        </div>
        
        <button action="submit" className="btn btn-primary form-control submit-button" >Submit</button> 
      </div>
      </form>
    )
  }
}



function mapStateToProps(state) {
  return { username: state.auth.username };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'create',
  initialValues: {difficulty: "Choose..."},
  validate
})(Create));
