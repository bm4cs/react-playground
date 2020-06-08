import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {
        title: "",
      },
    };
  }

  // arrow functions inherit the binding of their enclosing scope
  // so `this` just works
  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value }; //treat react state as immutable
    this.setState({ course: course });
  };

  handleSubmit = (event) => {
    event.preventDefault(); //no postbacks
    // console.log(this.state.course.title);
    // debugger;

    // option 1: implicit dispatch
    // this.props.dispatch(courseActions.createCourse(this.state.course));

    // option 2: simple CRUD wrappers
    // this.props.createCourse(this.state.course);

    // option 3: bindActionCreators
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

// Keep ESLint happy, define the implicit `dispatch` function in props
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  createCourse: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  // debugger;
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}

// mapDispatchToProps is injected automatically if omitted
// a dispatch() will automatically be added to `props`
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
