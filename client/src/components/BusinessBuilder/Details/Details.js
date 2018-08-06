import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Spacer from '../../Spacer';
import IndustrySelect from './IndustrySelect';
import CountrySelect from './CountrySelect';

const styles = theme => ({
  formControl: {
    marginTop: 2 * theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    height: 160,
    textAlign: 'center'
  },
  button: {
    padding: theme.spacing.unit * 2,
    textTransform: 'none'
  },
  icon: {
    color: theme.palette.text.secondary,
    fontSize: 48
  },
  center: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  country: {
    marginTop: 2 * theme.spacing.unit
  },
});

class Details extends Component {
  render() {
    const {
      classes,
      handleChange,
      handleCheck,
      handleUpload,
      industrySelect,
      countrySelect,
    } = this.props;

    return (
      <Grid container>

        {/* Basic info */}
        <Grid item xs={12}>
          <Typography variant="headline">
            Basic Details
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Company name"
            name="name"
            margin="normal"
            fullWidth
            value={this.props.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Bio"
            name="bio"
            margin="normal"
            multiline
            fullWidth
            value={this.props.bio}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <input type="file" name="logo" onChange={handleUpload} />
        </Grid>
        <Spacer />

        {/* Stages */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Stages
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Funding stage</FormLabel>
            <RadioGroup
              className={classes.group}
              aria-label="Fund stage"
              name="fundStage"
              value={this.props.fundStage}
              onChange={handleChange}
            >
              <FormControlLabel
                value="seed"
                control={<Radio />}
                label="Seed"
              />
              <FormControlLabel
                value="preSeed"
                control={<Radio />}
                label="Pre-seed"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Business stage</FormLabel>
            <RadioGroup
              className={classes.group}
              aria-label="Business stage"
              name="businessStage"
              value={this.props.businessStage}
              onChange={handleChange}
            >
              <FormControlLabel
                value="existing"
                control={<Radio />}
                label="Existing Business"
              />
              <FormControlLabel
                value="new"
                control={<Radio />}
                label="New Business"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Spacer />

        {/* Industry */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Industries
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {/* <FormControl> */}
            {/*
            <FormLabel component="legend">
              We profit mainly from
            </FormLabel>
            */}
            {/* <FormGroup> */}
          <FormControlLabel
            label="We sell a product"
            control={
              <Checkbox
                checked={this.props.product}
                onChange={handleCheck}
                name="product"
              />
            }
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            label="We provide a service"
            control={
              <Checkbox
                checked={this.props.service}
                onChange={handleCheck}
                name="service"
              />
            }
          />
            {/* </FormGroup> */}
          {/* </FormControl> */}
        </Grid>
        <Grid item xs={12}>
          <IndustrySelect
            selected={this.props.industries}
            handleChange={industrySelect}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Sub industry"
            name="subIndustry"
            margin="normal"
            fullWidth
            value={this.props.subIndustry}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="NAICS number"
            name="naics"
            margin="normal"
            type="number"
            fullWidth
            value={this.props.naics}
            onChange={handleChange}
          />
        </Grid>
        <Spacer />

        {/* Location */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Location
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.country}>
          <CountrySelect
            country={this.props.country}
            handleChange={countrySelect}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            name="city"
            margin="normal"
            fullWidth
            value={this.props.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Zip code"
            name="zip"
            margin="normal"
            type="number"
            fullWidth
            value={this.props.zip}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Street address"
            name="street"
            margin="normal"
            fullWidth
            value={this.props.street}
            onChange={handleChange}
          />
        </Grid>

      </Grid>
    );
  }
}

export default withStyles(styles)(Details);
