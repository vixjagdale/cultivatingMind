import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ProjectSettings = new Mongo.Collection('projectSettings');

if(Meteor.isServer){
Meteor.publish('projectSettings', function() {  return ProjectSettings.find({});
});
}