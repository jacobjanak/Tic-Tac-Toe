import React, { Component } from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { withStyles } from '@material-ui/core/styles';
import API from '../API';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import DropDown from './DropDown';
import ContainedTextField from './ContainedTextField';
import UploadedImage from './UploadedImage';
import LocationForm from './LocationForm';
import Spacer from './Spacer';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

// data
import countries from '../data/countries.json';
import states from '../data/states.json';
import genders from '../data/genders.json';
import educations from '../data/educations.json';
import ethnicities from '../data/ethnicities.json';
import incomes from '../data/incomes.json';
import maritalStatuses from '../data/maritalStatuses.json';
import children from '../data/children.json';

const styles = theme => ({
  paper: {
    paddingTop: 4 * theme.spacing.unit,
    paddingLeft: 8 * theme.spacing.unit,
    paddingRight: 8 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: '5%',
      paddingRight: '5%',
      borderRadius: 0,
    },
  },
  formControl: {
    width: '100%',
  },
  group: {
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
  flex: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  names: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  avatar: {
    position: 'relative',
    marginLeft: 4 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      margin: 'auto'
    },
  },
  upload: {
    position: 'absolute',
    bottom: -12,
    right: -4,
  },
  country: {
    // this replicates margin="dense"
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit / 2,
  },
  subtext: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  error: {
    marginTop: 2 * theme.spacing.unit,
    color: theme.palette.error.main,
  },
});

class Entrepreneur extends Component {
  constructor() {
    super()
    this.form = React.createRef();
    this.state = {
      img: '',
      imgPreview: '',
      firstName: '',
      lastName: '',
      gender: '',
      birthday: '',
      interests: '',
      bio: '',
      summary: '',
      education: '',
      ethnicity: '',
      income: '',
      maritalStatus: '',
      children: '',

      // address
      street: '',
      zip: '',
      city: '',
      state: '',
      country: '',
      error: false,
      errors: [],
    };
  }

  componentDidMount() {
    API.getUser()
    .then(res => {
      this.setState({
        ...res.data,
        imgPreview: res.data.img,
      })
    })
    .catch(res => console.log(res.data))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { zip } = this.state;
    const errors = [];

    if (zip) {
      if (!Number(zip) || zip.indexOf('e') >= 0) {
        errors.push("Zip code must only contain numbers")
      }
      if (zip.length !== 5) {
        errors.push("Zip code must be exactly 5 numbers")
      }
    }

    if (errors.length === 0) {
      API.editUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gender: this.state.gender,
        birthday: this.state.birthday,
        interests: this.state.interests,
        bio: this.state.bio,
        summary: this.state.summary,
        education: this.state.education,
        ethnicity: this.state.ethnicity,
        income: this.state.income,
        maritalStatus: this.state.maritalStatus,
        children: this.state.children,
        img: this.state.img,
        street: this.state.street,
        zip: this.state.zip,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
      })
      .then(res => this.props.history.push('/profile/' + res.data.url))
      .catch(err => {})
    } else {
      this.setState({ errors })
    }
  };

  changeState = (newState, cb) => {
    this.setState(newState, cb)
  };

  handleUpload = event => {
    const { name, files } = event.target;
    if (files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          img: files[0],
          imgPreview: reader.result
        });
      }
      reader.readAsDataURL(files[0])
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    if (name === 'bio') {
      if (value.length > 120) {
        return this.setState({ [name]: value.substring(0, 120) })
      }
    }

    if (name === 'summary') {
      if (value.length > 1000) {
        return this.setState({ [name]: value.substring(0, 1000) })
      }
    }

    this.setState({ [name]: value })
  };

  render() {
    const { classes } = this.props;
    const { imgPreview, errors } = this.state;

    const profilePic = this.state.imgPreview || '/img/user/default.jpg';

    return (
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit} ref={this.form}>
            <Grid container>

              <Grid item xs={12}>
                <Typography
                  variant="display1"
                  align="center"
                  color="textPrimary"
                >
                  Edit Profile
                </Typography>
              </Grid>
              { errors.length > 0 && (
                <div className={classes.error}>
                  { errors.map(error => (
                    <Typography color="inherit">
                      { error }
                    </Typography>
                  ))}
                </div>
              )}
              <Hidden smUp>
                <Spacer half />
              </Hidden>

              <Grid container className={classes.flex}>
                {/* Picture */}
                <div className={classes.avatar}>
                  <UploadedImage
                    img={profilePic}
                    alt="Profile picture"
                    rounded
                  />
                  <input
                    accept=".png, .jpg, .jpeg"
                    id="profile-picture"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={this.handleUpload}
                  />
                  <label className={classes.upload} htmlFor="profile-picture">
                    <Button
                      variant="fab"
                      component="span"
                      aria-label="edit"
                      mini
                    >
                      <PhotoCameraIcon style={{ fontSize: 18 }} />
                    </Button>
                  </label>
                </div>

                {/* Name */}
                <div className={classes.names}>
                  <Grid item xs={12}>
                    <TextField
                      label="First name"
                      name="firstName"
                      margin="dense"
                      fullWidth
                      required
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Last name"
                      name="lastName"
                      margin="dense"
                      fullWidth
                      required
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </div>
              </Grid>

              {/* Bio */}
              <Grid item xs={12}>
                <TextField
                  label="Headline"
                  name="bio"
                  margin="dense"
                  fullWidth
                  multiline
                  value={this.state.bio}
                  onChange={this.handleChange}
                />
              </Grid>

              {/* Summary */}
              <Grid item xs={12}>
                <ContainedTextField
                  label="Summary"
                  placeholder="Full professional summary"
                  name="summary"
                  margin="dense"
                  rows="4"
                  maxCharacters="1000"
                  fullWidth
                  value={this.state.summary}
                  onChange={this.handleChange}
                  labelProps={{
                    style: {
                      marginTop: 8,
                      fontSize: '0.75em',
                    }
                  }}
                />
              </Grid>
              <Spacer />

              {/* Address begins */}
              <Grid item xs={12}>
                <Typography variant="headline">
                  Location
                </Typography>
              </Grid>

              {/* City */}
              <Grid item xs={12}>
                <LocationForm
                  city={this.state.city}
                  changeState={this.changeState}
                />
              </Grid>

              {/* State */}
              { this.state.country.includes('United States of America') && (
                <Grid item xs={12}>
                  <DropDown
                    label="State"
                    name="state"
                    value={this.state.state}
                    options={states}
                    handleChange={this.handleChange}
                  />
                </Grid>
              )}

              {/* Country */}
              <Grid item xs={12}>
                <DropDown
                  label="Country"
                  name="country"
                  value={this.state.country}
                  options={countries}
                  handleChange={this.handleChange}
                  required
                />
              </Grid>
              <Spacer />

              {/* Personal information begins */}
              <Grid item xs={12}>
                <Typography variant="headline">
                  Personal Data
                </Typography>
                <Typography className={classes.subtext} variant="body1">
                  Your personal data is never displayed publicly.
                </Typography>
              </Grid>

              {/* Gender */}
              <Grid item xs={12}>
                <FormControl
                  className={classes.formControl}
                  component="fieldset"
                  margin="normal"
                  required
                  style={{ marginBottom: 0 }}
                >
                  <FormLabel component="legend" style={{ fontSize: '0.75em' }}>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    className={classes.group}
                    aria-label="Gender"
                    name="gender"
                    required
                    value={this.state.gender}
                    onChange={this.handleChange}
                  >
                    { genders.map((gender, i) => (
                      <FormControlLabel
                        value={gender}
                        control={<Radio required />}
                        label={gender}
                        key={i}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Birthday */}
              <Grid item xs={12}>
                <TextField
                  label="Birthday"
                  name="birthday"
                  type="date"
                  margin="dense"
                  required
                  value={this.state.birthday}
                  onChange={this.handleChange}
                  InputLabelProps={{ shrink: true }}
                  style={{
                    width: '100%',
                    marginTop: 0
                  }}
                />
              </Grid>

              {/* Education */}
              <Grid item xs={12}>
                <DropDown
                  label="Education"
                  name="education"
                  value={this.state.education}
                  options={educations}
                  handleChange={this.handleChange}
                  required
                />
              </Grid>

              {/* Ethnicity */}
              <Grid item xs={12}>
                <DropDown
                  label="Race or ethnicity"
                  name="ethnicity"
                  value={this.state.ethnicity}
                  options={ethnicities}
                  handleChange={this.handleChange}
                  required
                />
              </Grid>

              {/* Income level */}
              <Grid item xs={12}>
                <DropDown
                  label="Annual income"
                  name="income"
                  value={this.state.income}
                  options={incomes}
                  handleChange={this.handleChange}
                  required
                />
              </Grid>

              {/* Marital status */}
              <Grid item xs={12}>
                <DropDown
                  label="Marital statuses"
                  name="maritalStatus"
                  value={this.state.maritalStatus}
                  options={maritalStatuses}
                  handleChange={this.handleChange}
                  required
                />
              </Grid>

              {/* Children */}
              <Grid item xs={12}>
                <DropDown
                  label="Children"
                  name="children"
                  value={this.state.children}
                  options={children}
                  handleChange={this.handleChange}
                  required
                />
              </Grid>
              <Spacer />

              {/* Interests */}
              {/*
              <Grid item xs={12}>
                <FormControl className={classes.formControl} margin="dense">
                  <InputLabel htmlFor="interests">Interests</InputLabel>
                  <Select
                    value={this.state.interests}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'interests',
                      id: 'interests',
                    }}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              */}

              {/* Submit button */}
              <Grid container justify="flex-end">
                <Button
                  className={classes.submit}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Update Profile
                </Button>
              </Grid>
              <Spacer />

            </Grid>
          </form>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Entrepreneur);
