'use strict';

module.exports = (capability) => {
    // capability:create, update,delete,read taken from the route)
  
    return (req, res, next) => {

      try {
        console.log('req.user (ACL) >>', req.user);
        //capabilitie i already defined
        if (req.user.capabilities.includes(capability)) {
          next();
        } else {
          res.status(403).send('Access Denied!');
        }
      } catch (e) {
        res.status(403).send(e);
      }
    };
  };
