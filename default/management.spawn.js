require('prototype.spawn')();



module.exports ={
  run: function(thisSpawn, spawnRoom, roomCreeps){


// var cpuUsed1 = Game.cpu.getUsed();console.log("CPU Used before creeps: " + cpuUsed1);
let roomObjs = [];
roomObjs = spawnRoom.find(FIND_MY_STRUCTURES);
roomStructs = _.groupBy(this.roomObjs, function (s) {
  rvar = s.structureType
  return rvar;
});


//Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1');

//var cpuUsed2 = Game.cpu.getUsed();console.log("CPU Used before creeps: " + cpuUsed2);

// if(thisSpawn === Game.spawns.Spawn1){
//   console.log(roomStructs.terminal[0].id);
// }

//console.log(this);



const spawnBusy = thisSpawn.createCreep() === ERR_BUSY;
thisSpawn.memory.sleepCounter -= 1;
        let myRoles = [

        "harvester",
        "storagefiller",
        "spawnfiller",
        "marketfiller",
        "upgrader",
        "builder",
        "waller",
        "maintenance",
        "defender",
        "claimer",
        "breacher"

        ];
        creepsGroup = _.groupBy(roomCreeps, function (c) {
          newVar = c.memory.role
          return newVar;
        });
        for(a in myRoles){
          temp = myRoles[a];
          if (!creepsGroup[temp]){
            Reflect.set(creepsGroup, temp, []);
          }
        }
//console.log(creepsGroup.builder.length);




if((thisSpawn.memory.sleepCounter < 1)&&(spawnBusy === false)) {
  let spawned;



  const roomMemory = spawnRoom.memory;
  const roomLevel = thisSpawn.memory.roomTier;
  let minimumUpgraders = thisSpawn.memory.minimumUpgraders;
  const harvestersBlock1 = roomCreeps.filter(c => ((c.memory.role === 'harvester')&& (c.memory.sourceBlock === roomMemory.energySource1))).length;
  const harvestersBlock2 = roomCreeps.filter(c => ((c.memory.role === 'harvester')&& (c.memory.sourceBlock === roomMemory.energySource2))).length;
  const totalHarvesters = harvestersBlock1 + harvestersBlock2;

  const theMineralSource = Game.getObjectById(roomMemory.mineralSource);
  let curSpawnEnergy = spawnRoom.energyAvailable;

  if(thisSpawn.memory.minimumSpawnFillers > 0){var stationaryHarvest = true;}else{var stationaryHarvest = false;}
  if(thisSpawn.memory.minimumStorageFillers > 0){var stationaryUpgrade = true;}else{var stationaryUpgrade = false;}




  if(roomMemory.mainStorage != undefined){
    let energyStored = Game.getObjectById(roomMemory.mainStorage);
    energyStored = energyStored.store.energy
  }else{
    energyStored = 0;
  }


  if((spawnRoom.find(FIND_CONSTRUCTION_SITES)).length > 0){thisSpawn.memory.isBuilding = true;}else{thisSpawn.memory.isBuilding = false;}

 if(thisSpawn.memory.isBuilding === true){
   if (minimumUpgraders > 1){
     minimumUpgraders--;
   }

 }


//thisSpawn.createSimpleWorker(thisSpawn.id, curSpawnEnergy, spawnRoom.name, 'test', roomMemory.energySource1, roomMemory.mainStorage,roomMemory.mineralContainer);



                    //SPAWNING

  //HARVESTER
    if ((totalHarvesters < thisSpawn.memory.minimumHarvesters)&&(totalHarvesters > 0 ) ){




      if (harvestersBlock1 < (Math.floor(thisSpawn.memory.minimumHarvesters/2))){

        if(!(curSpawnEnergy < thisSpawn.memory.HarvesterEnergy)){
          if (stationaryHarvest === true){




            spawned = thisSpawn.createStationaryHarvester(thisSpawn.id, thisSpawn.memory.HarvesterEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'harvester', roomMemory.energySource1, roomMemory.mainStorage,
             roomMemory.mineralContainer,true, roomMemory.sourceContainer1, true, roomMemory.sourcesClose);
             return;
          }else{
            spawned = thisSpawn.createSimpleWorker(thisSpawn.id, curSpawnEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'harvester', roomMemory.energySource1, roomMemory.mainStorage,roomMemory.mineralContainer,);
            return;
          }

        }

      }else{

        if(!(curSpawnEnergy < thisSpawn.memory.HarvesterEnergy)) {

          if(stationaryHarvest  ===  true){
              //console.log('hi');

            spawned = thisSpawn.createStationaryHarvester(thisSpawn.id, thisSpawn.memory.HarvesterEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'harvester', roomMemory.energySource2, roomMemory.mainStorage,
             roomMemory.mineralContainer,true, roomMemory.sourceContainer2, true, roomMemory.sourcesClose);
             return;
          }
             else{
            spawned = thisSpawn.createSimpleWorker(thisSpawn.id, curSpawnEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'harvester', roomMemory.energySource2, roomMemory.mainStorage,roomMemory.mineralContainer,);
            return;
          }

        }

      }

    }else if(totalHarvesters < 1){
      let hasEnergy = spawnRoom.find(FIND_STRUCTURES, {filter: (structure) =>
          { return (((structure.structureType == STRUCTURE_CONTAINER)||(structure.structureType == STRUCTURE_STORAGE))
          &&(structure.store.energy > thisSpawn.memory.HarvesterEnergy))

          }})

      if(!(curSpawnEnergy < 200)){
          if((hasEnergy.length <1)||(creepsGroup.spawnfiller.length > 0)){

              spawned = thisSpawn.createSimpleWorker(thisSpawn.id, curSpawnEnergy, spawnRoom.name, 1, 'harvester', roomMemory.energySource1, roomMemory.mainStorage,roomMemory.mineralContainer);
                return;
            }else if(thisSpawn.memory.minimumSpawnFillers > 0){

                    spawned = thisSpawn.createFiller(thisSpawn.id, curSpawnEnergy, spawnRoom.name, 1, 'spawnfiller', roomMemory.mainStorage, roomMemory.sourceContainer1, roomMemory.sourceContainer2,
                    roomMemory.mineralContainer, undefined, roomMemory.sourceContainer1, roomMemory.sourceContainer2);
                    return;

            }

      }else{
        //console.log('All is lost. Pray and love your families.');
      }
    }



      //SPAWNFILLER
      else if(creepsGroup.spawnfiller.length < thisSpawn.memory.minimumSpawnFillers){
        if(thisSpawn.memory.minimumSpawnFillers >= 2){
          if( roomCreeps.filter(c => ((c.memory.role === 'spawnfiller')&& (c.memory.supply === roomMemory.sourceContainer1))).length < 1){
            if(!(curSpawnEnergy < thisSpawn.memory.FillerEnergy)){
                spawned = thisSpawn.createFiller(thisSpawn.id, thisSpawn.memory.FillerEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'spawnfiller', roomMemory.mainStorage, roomMemory.sourceContainer1, undefined,
                roomMemory.mineralContainer, undefined, roomMemory.sourceContainer1, roomMemory.sourceContainer2, thisSpawn);
                return;
              }
            }

          else if(roomCreeps.filter(c => ((c.memory.role === 'spawnfiller')&& (c.memory.supply === roomMemory.sourceContainer2))).length < 1){
            if(!(curSpawnEnergy < thisSpawn.memory.FillerEnergy+100)){
              spawned = thisSpawn.createFiller(thisSpawn.id, (thisSpawn.memory.FillerEnergy)+100, spawnRoom.name, thisSpawn.memory.roomTier, 'spawnfiller', roomMemory.mainStorage, roomMemory.sourceContainer2,undefined,
              roomMemory.mineralContainer, undefined, roomMemory.sourceContainer1, roomMemory.sourceContainer2);
              return;
            }
          }
        }else if(thisSpawn.memory.minimumSpawnFillers === 1){
          if(!(curSpawnEnergy < thisSpawn.memory.FillerEnergy)){
              spawned = thisSpawn.createFiller(thisSpawn.id, thisSpawn.memory.FillerEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'spawnfiller', roomMemory.mainStorage, roomMemory.sourceContainer1, roomMemory.sourceContainer2,
              roomMemory.mineralContainer, undefined, roomMemory.sourceContainer1, roomMemory.sourceContainer2);
              return;
            }
        }
      }


  //UPGRADER
    else if (creepsGroup.upgrader.length < minimumUpgraders
      //&&(creepsGroup.upgrader.length > 0)
            ){

      if(!(curSpawnEnergy < thisSpawn.memory.UpgraderEnergy)){
        if(stationaryUpgrade === true){
          spawned = thisSpawn.createStationaryUpgrader(thisSpawn.id, thisSpawn.memory.UpgraderEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'upgrader', roomMemory.mainStorage, true);
          return;
        }else{
          spawned = thisSpawn.createSimpleWorker(thisSpawn.id, thisSpawn.memory.UpgraderEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'upgrader', roomMemory.energySource2, roomMemory.mainStorage,roomMemory.mineralContainer);
          return;
        }

      }
    }
    // else if(creepsGroup.upgrader.length < 1){
    //   if(!(curSpawnEnergy < 200)){
    //     spawned = thisSpawn.createSimpleWorker(thisSpawn.id, 200, spawnRoom.name, thisSpawn.memory.roomTier, 'upgrader', undefined, roomMemory.mainStorage,roomMemory.mineralContainer);
    //     return;
    //   }
    // }


  //MINERALHARVESTER
  else if((roomCreeps.filter(c => ((c.memory.role  ===  'harvester')&& (c.memory.sourceBlock === roomMemory.mineralSource))).length  < thisSpawn.memory.minimumMineralHarvesters)&&(theMineralSource.mineralAmount > 0)){


    if(!(curSpawnEnergy < thisSpawn.memory.HarvesterEnergy)){
        spawned = thisSpawn.createStationaryHarvester(thisSpawn.id, thisSpawn.memory.HarvesterEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'harvester', roomMemory.mineralSource, roomMemory.mainStorage,
         roomMemory.mineralContainer,true, roomMemory.mineralContainer, true, false, true);
         return;
    }




  }



    //MAINTENANCE
    else if(creepsGroup.maintenance.length <thisSpawn.memory.minimumMaintenance){
      if(!(curSpawnEnergy < thisSpawn.memory.MaintenanceEnergy)){
        spawned = thisSpawn.createSimpleWorker(thisSpawn.id, thisSpawn.memory.MaintenanceEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'maintenance', undefined, roomMemory.mainStorage,roomMemory.mineralContainer,roomMemory.wallStrength);
        return;
      }

    }






  //STORAGEFILLER
  else if(creepsGroup.storagefiller.length < thisSpawn.memory.minimumStorageFillers){

      if(!(curSpawnEnergy < thisSpawn.memory.FillerEnergy)){
        spawned = thisSpawn.createFiller(thisSpawn.id, thisSpawn.memory.FillerEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'storagefiller', roomMemory.mainStorage, undefined, undefined,
        roomMemory.mineralContainer, undefined, roomMemory.sourceContainer1, roomMemory.sourceContainer2);
        return;
      }

  }



  //MARKETFILLER
  else if((creepsGroup.marketfiller.length < thisSpawn.memory.minimumMarketFillers)&&(theMineralSource.mineralAmount > 0)){
      if(!(curSpawnEnergy < thisSpawn.memory.FillerEnergy)){
        spawned = thisSpawn.createFiller(thisSpawn.id, thisSpawn.memory.FillerEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'marketfiller', roomMemory.mainStorage, roomMemory.mineralContainer, undefined,
        roomMemory.mineralContainer, undefined, roomMemory.sourceContainer1, roomMemory.sourceContainer2,
        roomMemory.mineralType, roomMemory.roomTerminal);
        return;
      }

  }





  //BUILDER
    else if(creepsGroup.builder.length< thisSpawn.memory.minimumBuilders && thisSpawn.memory.isBuilding === true){
        if(!(curSpawnEnergy < thisSpawn.memory.BuilderEnergy)){

          spawned = thisSpawn.createSimpleWorker(thisSpawn.id, thisSpawn.memory.BuilderEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'builder', undefined, roomMemory.mainStorage);
          return;
        }


    }
  //WALLER
    else if((creepsGroup.waller.length < thisSpawn.memory.minimumWallers) && (((spawnRoom.find(FIND_STRUCTURES, {filter: (structure) =>
    { return (((structure.structureType === STRUCTURE_WALL))
    && (structure.hits < roomMemory.wallStrength)) } }))).length > 0)) {


      if(creepsGroup.waller.length <thisSpawn.memory.minimumWallers){

        spawned = thisSpawn.createSimpleWorker(thisSpawn.id, thisSpawn.memory.BuilderEnergy, spawnRoom.name, thisSpawn.memory.roomTier, 'waller', undefined, roomMemory.mainStorage,undefined,roomMemory.wallStrength);
        return;
        // spawned = thisSpawn.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE],undefined,
        //   { roomName: spawnRoom.name,role: "waller", targetStrength: roomMemory.wallStrength, storageBlock: thisSpawn.memory.storaging});
        //   return;
      }
    }





    //HELPING ALLIES
    else if((roomMemory.isHelpingRoom === true)&&(energyStored > 100000)
    &&((roomCreeps.filter(c => c.memory.targetRoom  ===  roomMemory.helpingRoom).length < 4))

  ){
      if((thisSpawn.memory.helperUnit === undefined)||(thisSpawn.memory.helperUnit === 'builder')){
        spawned = thisSpawn.createHelperWorker(thisSpawn.id, (curSpawnEnergy*.3), spawnRoom.name, thisSpawn.memory.roomTier, 'builder', roomMemory.mainStorage, roomMemory.helpingRoom);
        return;
      }


    }





//WALLBREAKER
    // else if(creepsGroup.breacher.length < 2){
    //
    //
    //   Game.spawns.Spawn1.breakWall(spawnRoom.name,['W58N32'], '5ab3ea3339d7fb3e944fc5d3')
    // }



  //NOSPAWN
    else{
      // if( thisSpawn === Game.spawns.Spawn1){
      //     console.log("no spawns required");
      //   }
      thisSpawn.memory.sleepCounter = (Math.floor(Math.random() * 10) + 1);
    }







  }



//console.log((roomCreeps.filter(c => c.memory.targetRoom  ===  roomMemory.helpingRoom).length))





//var cpuUsed2 = Game.cpu.getUsed();console.log("CPU Used before " + thisSpawn+": " + cpuUsed2);




  }
}
