import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import MenuItem from 'material-ui/Menu/MenuItem';

import Lookup from '../../components/Lookup'
import OwnInstitutionField from '../../components/OwnInstitutionField';

import { DraftTextInput, DraftCheckboxInput } from '../../draft/DraftInput';

import ShowOnlyWhenDraftFieldIs from '../containers/ShowOnlyWhenDraftFieldIs';
import sharedStyles from '../styles';
import { PURPOSE_LABELS } from '../data';

/**
 * The "general information" section of the asset form.
 */
const GeneralInformationFields = ({ component: Component = 'div', classes, ...rest }) => (
  <Component {...rest}>
    <Grid container spacing={40}>
      <Grid item xs={6}>
        <DraftTextInput
          name="name"
          component={TextField}
          required
          fullWidth
          label="Asset name"
          helperText={
            "Give the asset a unique name so you can easily identify it, for example, " +
            "'Visting academics database'."
          }
        />
      </Grid>
      <Grid item xs={6} />

      <Grid item xs={6}>
        <DraftTextInput
          name="department"
          component={OwnInstitutionField}
          required
          fullWidth
          label="Asset department"
        />
      </Grid>
      <Grid item xs={6} />

      <Grid item xs={6}>
        <DraftTextInput
          name="purpose"
          component={TextField}
          required
          fullWidth
          select
          label="Asset purpose"
          helperText={
            // HACK: non-breaking space character, used to make sure the space of helper text is
            // taken up to avoid the section resizing when owner and purpose_other field comes and
            // goes.
            "\xa0"
          }
        >
          {PURPOSE_LABELS.map(({ value, label }) => (
            <MenuItem key={value} value={value}>{ label }</MenuItem>
          ))}
        </DraftTextInput>
      </Grid>
      <Grid item xs={6}>
        <ShowOnlyWhenDraftFieldIs name="purpose" expectedValue="research">
          <DraftTextInput
            name="owner"
            required
            fullWidth
            component={Lookup}
            label="Who is the Principal Investigator of this research activity?"
            helperText="You can search by either name or CRSid"
            classes={{ container: classes.fullWidth }}
          />
        </ShowOnlyWhenDraftFieldIs>

        <ShowOnlyWhenDraftFieldIs name="purpose" expectedValue="other">
          {/* TODO: this needs backend change to support purpose: other? */}
          <TextField
            name="purpose_other"
            required
            fullWidth
            label="Other purpose"
            helperText={
              "For example, 'To keep a record of current and former staff and salaries for HR " +
              "purposes.'"
            }
          />
        </ShowOnlyWhenDraftFieldIs>
      </Grid>

      <Grid item xs={6}>
        <DraftCheckboxInput
          name="private"
          component={FormControlLabel}
          control={<Switch />}
          label="Make this record private to your deparment"
        />
      </Grid>
      <Grid item xs={6} />
    </Grid>
  </Component>
);

GeneralInformationFields.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const styles = theme => ({
  ...sharedStyles,

  // hack for Lookup component to make Autosuggest full width
  fullWidth: { width: '100%' }
});

export default withStyles(styles)(GeneralInformationFields);
