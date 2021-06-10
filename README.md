# groupchat-graphql
  This app uses GraphQL subscription for group messaging.

# CONFIG FILE
  Change sample-config.js to config.js.
  Enter your credentials required for the app to work.
 
 # STEPS
  1. Open cmd for {parent} and {parent}/client folder.
  2. npm start on both cmd.
  3. Open GraphQL play ground and execute the following query to create a group:
    query addGroup{
      addGroup(name:"group name")
     }
  
 # TO TEST
  Open two different browsers, register and login.
