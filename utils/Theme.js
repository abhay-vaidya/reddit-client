import { connect } from "react-redux";

const withTheme = connect(state => ({ theme: state.global.theme }));

export default withTheme;
