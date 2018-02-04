import React from 'react';
import MuiSnackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { snackbarClose } from '../redux/actions/snackbar';

const Snackbar = ({ isOpen, message, snackbarClose }) => (
  <MuiSnackbar
    open={isOpen} message={message} autoHideDuration={3000}
    onRequestClose={snackbarClose}
  />
);

const mapStateToProps = ({ snackbar: { isOpen, message } }) => ({ isOpen, message });

const mapDispatchToProps = { snackbarClose };

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
