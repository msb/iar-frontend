import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles';

import LogoutLink from './LogoutLink';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import { List, ListItem } from 'material-ui';
import SidebarNavLink from './SidebarNavLink';
import Logo from '../images/cambridgeuniversity_logo.svg';
import {connect} from "react-redux";
import {getSelf} from "../redux/actions/lookupApi";

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
  nested: { paddingLeft: theme.spacing.unit * 4 },
  camLogo: { width: '145px', paddingTop: '10px'},
  tagLine: { fontSize: 12 },
  logoToolbar: { flexDirection:'column', alignItems: 'flex-start', paddingLeft: theme.spacing.unit * 2 },
  assetHeading: { padding: '12px 16px' }
});

/**
 * The content of the IAR application side bar.
 */
class Sidebar extends Component {

  /**
   * If we are signed in and we haven't retrieved the profile - then retrieve the profile.
   * TODO I guess we need to find a better place for this as Sidebar won't always be rendered.
   */
  componentDidMount() {
    const { isLoggedIn, self, selfLoading, getSelf } = this.props;
    if (isLoggedIn && !self && !selfLoading) {
      getSelf();
    }
  }

  render() {
    const { classes, institutions, pathname } = this.props;

    return <div>
      <div className={classes.drawerHeader}>
        <Toolbar className={classes.logoToolbar} disableGutters={true}>
          <img src={Logo} className={classes.camLogo} alt="Cambridge University Logo"/>
          <div className={classes.tagLine}>Information Asset Register</div>
        </Toolbar>
      </div>
      <Divider />

      <List component='nav'>
        <ListItem className={classes.assetHeading}>Assets:</ListItem>
        {
          /* TODO if you don't pass pathname here then "by department" Sidebar items don't re-render and item selection isn't updated */
          institutions.map(({ instid, name }) => (
            <SidebarNavLink key={instid} to={'/assets/' + instid} label={name} className={classes.nested} pathname={pathname} />
          ))
        }
        {/* TODO if you don't pass pathname here then "by department" Sidebar items don't re-render and item selection isn't updated */}
        <SidebarNavLink to='/assets/all' label='All departments' className={classes.nested} pathname={pathname} />
        <SidebarNavLink to='/help' label='Help' />
        <SidebarNavLink component={LogoutLink} label='Sign out' />
      </List>
    </div>
  }
}

const mapDispatchToProps = { getSelf };

const mapStateToProps = ({ auth: { isLoggedIn }, lookupApi: { self, selfLoading } }) => {

  const institutions = (self && self.institutions ? self.institutions : []);
  return { isLoggedIn, self, selfLoading, institutions };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar));
