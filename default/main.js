var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')
var roleMaintenance = require('role.maintenance')
var roleWaller = require('role.waller')
var roleStorageFiller = require('role.storagefiller')
var roleSpawnFiller = require('role.spawnfiller')
var roleClaimer = require('role.claimer')
var roleDefender = require('role.defender')
var roleMarketFiller = require('role.marketfiller')
var roleBreacher = require('role.breacher')
var codeTester = require('role.tester')

global.main = this;






var spawnManage = require('management.spawn')
var spawnRules = require('management.spawnrules');
var marketRules = require('management.marketplace');
var roomMem = require('management.roominfo');
var defenseTower = require('defense.tower')

var memoryClearTimer = 999;


var self = this;



var runUpdate = function(targetSpawn){targetSpawn.memory.needsUpdated = true;}





const profiler = require('screeps-profiler');


profiler.enable();
module.exports.loop = function() {
  profiler.wrap(function() {


var allCreeps = Object.values(Game.creeps);




                                 for(let updateRoom in Game.rooms){
                                      var buildRoom = Game.rooms[updateRoom];






                                      //console.log(buildRoom.name)

                                    if(Boolean(buildRoom.controller)){
                                      if(Boolean(buildRoom.controller.my) == true){

                                        // let roomObjs = [];
                                        // roomObjs = buildRoom.find(FIND_STRUCTURES);
                                        // buildRoom.roomStructs = _.groupBy(roomObjs, function (s) {
                                        //   rvar = s.structureType
                                        //   return rvar;
                                        // });








                                        myRooms = buildRoom.controller.my
                                          buildRoom.memory.checkTime += 1;

                                          if(buildRoom.memory.checkTime >= 14){
                                            roomMem.run(buildRoom);


                                            if(Boolean(buildRoom.memory.mainSpawn) == true){
                                              if (buildRoom.memory.spawnNeedsUpdate == true){
                                                spawnObj = Game.getObjectById(buildRoom.memory.mainSpawn);
                                                spawnRules.run(spawnObj, buildRoom);
                                                buildRoom.memory.spawnNeedsUpdate = false;
                                              }
                                            }




                                            else{
                                              //console.log('uh oh');
                                              var helperChoice;

                                               for(let otherRooms in Game.rooms){
                                                 var theRoom = Game.rooms[otherRooms];
                                                 if(((Game.map.getRoomLinearDistance(buildRoom.name, theRoom.name) < helperChoice)||(helperChoice == undefined)) &&
                                                 (theRoom.name != buildRoom.name)&&(theRoom.controller.level > 4)) {
                                                   helperChoice = theRoom;
                                                 }
                                               }

                                               if (helperChoice != undefined){
                                                 helperChoice.memory.isHelpingRoom = true;
                                                 helperChoice.memory.helpingRoom = buildRoom.name;
                                               }


                                            }







                                            if(Boolean(buildRoom.memory.roomTerminal) == true){
                                              //console.log('stonks');
                                              marketRules.run(buildRoom.terminal);
                                            }

                                            if(Boolean(buildRoom.memory.isHelpingRoom) == true){
                                              roomObj = Game.rooms[buildRoom.memory.helpingRoom];
                                              if((Boolean(roomObj.memory.mainSpawn) == true)&&(roomObj.controller.level > 2)) {
                                                console.log('DONE!');
                                                buildRoom.memory.isHelpingRoom = false;
                                                buildRoom.memory.helpingRoom = undefined;
                                              }
                                            }


                                            buildRoom.memory.checkTime = 0;
                                          }



                                          var roomHostiles = buildRoom.find(FIND_HOSTILE_CREEPS);
                                          if(roomHostiles.length > 0){
                                            var myTowers = buildRoom.find(FIND_MY_STRUCTURES, {filter: (structure) =>
                                            { return ((structure.structureType == STRUCTURE_TOWER)) } })
                                            for(var i in myTowers){defenseTower.run(myTowers[i], roomHostiles);}
                                          }


                                            // var cpuUsed1 = Game.cpu.getUsed();

                                          if(Boolean(buildRoom.memory.mainSpawn) == true){
                                            spawnObj = Game.getObjectById(buildRoom.memory.mainSpawn);
                                            thisRoomCreeps = allCreeps.filter(c => ((c.memory.homeRoom === buildRoom.name)));
                                            spawnManage.run(spawnObj, buildRoom, thisRoomCreeps);
                                          }


                                          for(let name in Game.creeps){


                                            var creep = Game.creeps[name];
                                            //creep.suicide();

                                            if(creep.memory.homeRoom == buildRoom.name){
                                              if(creep.memory.role == 'harvester'){roleHarvester.run(creep,buildRoom);}
                                              if(creep.memory.role == 'upgrader'){roleUpgrader.run(creep,buildRoom);}
                                              if(creep.memory.role == 'builder'){roleBuilder.run(creep,buildRoom);}
                                              if(creep.memory.role == 'maintenance'){roleMaintenance.run(creep,buildRoom);}
                                              if(creep.memory.role == 'waller'){roleWaller.run(creep,buildRoom);}
                                              if(creep.memory.role == 'storagefiller'){roleStorageFiller.run(creep,buildRoom);}
                                              if(creep.memory.role == 'spawnfiller'){roleSpawnFiller.run(creep,buildRoom);}
                                              if(creep.memory.role == 'claimer'){roleClaimer.run(creep,buildRoom);}
                                              if(creep.memory.role == 'breacher'){roleBreacher.run(creep,buildRoom);}
                                              if(creep.memory.role == 'defender'){roleDefender.run(creep,buildRoom);}
                                              if(creep.memory.role == 'marketfiller'){roleMarketFiller.run(creep,buildRoom);}
                                              if(creep.memory.role == 'tester'){codeTester.run(creep);}
                                            }
                                          }



                                      }
                                    }





                                  }



   //SPAWN SCRIPT












memoryClearTimer += 1;
if(memoryClearTimer > 10){



  for(var i in Memory.creeps) {
      if(!Game.creeps[i]) {delete Memory.creeps[i];}
  }
  // for(var i in Memory.spawns) {
  //     if(!Game.spawns[i]) {delete Memory.spawns[i];}
  // }
  // for(var i in Memory.rooms) {
  //     if(!Game.rooms[i]) {delete Memory.rooms[i];}
  // }


  memoryClearTimer = 0;
}









})
}
