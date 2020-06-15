import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch((error) => {
      alert("Loading courses failed " + error);
    });
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </>
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
    //this will shove all action creator functions into props
    //this.props.actions.loadCourses()
    actions: bindActionCreators(courseActions, dispatch),
  };
}

// mapDispatchToProps is injected automatically if omitted
// a dispatch() will automatically be added to `props`
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
