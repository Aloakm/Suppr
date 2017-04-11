import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Sidebar extends Component {

  componentWillMount(){
    $(window).resize(function() {
    	var path = $(this);
    	var contW = path.width();
    	if(contW >= 751){
    		document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
        $("#recipe-view").addClass("recipe-view-margin");
    	}else{
    		document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
    	}
    });
    $(document).ready(function() {
    	$('.body').on('show.bs.dropdown', function(e){
    	    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    	});
    	$('.body').on('hide.bs.dropdown', function(e){
    		$(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
    	});
      $('#root').on('click', '.side-item', function () {
        $('.sidebar-selected').removeClass('sidebar-selected')
        $(this).addClass('sidebar-selected')
      })
    	$("#menu-toggle").click(function(e) {
    		e.preventDefault();
    		var elem = document.getElementById("sidebar-wrapper");
    		var left = window.getComputedStyle(elem,null).getPropertyValue("left");
    		if(left === "200px"){
    			document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
          $("#recipe-view").removeClass("recipe-view-margin")
    		}
    		else if(left === "-200px"){
    			document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
          $("#recipe-view").addClass("recipe-view-margin");
    		}
    	});
    });
  }


  handleDeleteSpork() {
    this.props.deleteRecipe(this.props.selectedVariation.id, true)
  }

  handleDelete() {
    this.props.deleteRecipe(this.props.recipe.id)
  }

  handleEdit() {
    this.props.pushUpdate(this.props.recipe)
  }

  handleEditSpork() {
    const {name, image, prep_time, cook_time} = this.props.selectedVariation
    this.props.pushUpdate({
      ...this.props.selectedVariation, 
      recipeName: name, 
      imageUrl: image,
      prepTime: prep_time,
      cookTime: cook_time,
      parentId: this.props.recipe.id
    }, true)
  }

  handleVariation() {
    this.props.pushVariation(this.props.recipe)
  }

  renderVariations() {
    if (this.props.recipe && this.props.variations && this.props.variations[this.props.recipe.id]) {
      return this.props.variations[this.props.recipe.id].map((variation,i) => {
        return (
          <li  className={`side-item ${this.props.sporkId===variation.id?'sidebar-selected':''}`} key={i} onClick={() => this.props.selectVariation(this.props.recipe.id, variation.id)}>
            <a> {variation.name.length > 20 ? variation.name.slice(0,20).trim()+'...' : variation.name}</a>
          </li>
        )
      })
      
    }
  }

  render() {
    const selected = !this.props.sporkId ? 'side-item sidebar-selected' : 'side-item'
    const { username, recipeName } = this.props.recipe?this.props.recipe:'';
    return (
      <nav className="navbar navbar-default" role="navigation">
      	<div className="container">
      		<div className="navbar-header">
      			<a id="menu-toggle" href="#" className="navbar-toggle">
      					<button className="btn btn-primary">Side Bar</button>
      			        <span className="icon-bar"></span>
      			        <span className="icon-bar"></span>
      			        <span className="icon-bar"></span>
      			</a>
      		</div>
      		<div id="sidebar-wrapper" className="sidebar-toggle">
      			<ul className="sidebar-nav">
      		    	{!this.props.selectedVariation && this.props.username===username &&
                  <li onClick={this.handleDelete.bind(this)}>
                    <a >Delete Recipe</a>
                  </li>
                }
                {this.props.selectedVariation && this.props.username===this.props.selectedVariation.username &&
                  <li onClick={this.handleDeleteSpork.bind(this)}>
                    <a >Delete this spork</a>
                  </li>
                }
                {!this.props.selectedVariation && this.props.username===username &&
                  <li onClick={this.handleEdit.bind(this)}>
                    <a >Edit</a>
                  </li>
                }
                {this.props.selectedVariation && this.props.username===username &&
                  <li onClick={this.handleEditSpork.bind(this)}>
                    <a >Edit this spork</a>
                  </li>
                }
                {!this.props.selectedVariation && this.props.username &&
                  <li onClick={this.handleVariation.bind(this)}>
                    <a>Spork this recipe</a>
                  </li>
                }

                <hr />
                <li className={selected} onClick={() => {this.props.getReview(this.props.recipe.id);this.props.deselectVariation()}}>
                  <a >{recipeName&&recipeName.length > 20 ? recipeName.slice(0,20).trim()+'...' : recipeName}</a>
                </li>
                {this.renderVariations.call(this)}
      		  	</ul>
      		</div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.username,
    variations: state.recipes.variations,
    selectedVariation: state.recipes.selectedVariation
  }
}

export default connect(mapStateToProps, actions)(Sidebar);
