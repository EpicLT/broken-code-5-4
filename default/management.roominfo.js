module.exports ={
  run: function(roomID){
    let curRoom = roomID;

    //var startRoomMe

    // if((updateSpawn.memory.roomName == 'W7N3')
    // &&(updateSpawn.memory.needsUpdated == true)){
    //
    //   spawnRules.run(updateSpawn,updateSpawn.room.controller.level);
    //
    //



    //   updateSpawn.memory.wallStrength = 60000;
    //
    //
    //
    //
    //   updateSpawn.memory.needsUpdated = false;
    // }


    for(let spot in curRoom.memory){

      var thisMem = curRoom.memory[spot];

      if((thisMem !=curRoom.memory.checkTime)&&(thisMem !=curRoom.memory.rcl)&&(thisMem !=curRoom.memory.multipleEnergySource)&&
      (thisMem !=curRoom.memory.sourcesClose)&&(thisMem !=curRoom.memory.mineralType)&&(thisMem !=curRoom.memory.wallStrength)&&
      (thisMem !=curRoom.memory.isHelpingRoom)&&(thisMem !=curRoom.memory.helpingRoom)&&(thisMem !=curRoom.memory.needsMaintenance)&&
      (thisMem !=curRoom.memory.spawnNeedsUpdate)&&(thisMem !=curRoom.memory.totalEnergy)){
        if(Boolean(Game.getObjectById(thisMem)) == false){
          curRoom.memory[spot] = undefined;
          console.log(curRoom + " has an invalid memory of "+ thisMem);
          curRoom.memory.spawnNeedsUpdate = true;
        }
      }



    }








      if(curRoom.memory.rcl != curRoom.controller.level){
        curRoom.memory.rcl = curRoom.controller.level;
        curRoom.memory.spawnNeedsUpdate = true;
      }
      if(curRoom.memory.totalEnergy != curRoom.energyCapacityAvailable){
        curRoom.memory.totalEnergy = curRoom.energyCapacityAvailable;
        curRoom.memory.spawnNeedsUpdate = true;

      }
      if(curRoom.memory.rcl === 2 && curRoom.memory.totalEnergy < 450){
          curRoom.memory.rcl = 1;
          curRoom.memory.spawnNeedsUpdate = true;
      }else if(curRoom.memory.rcl === 3 && curRoom.memory.totalEnergy < 600){
          curRoom.memory.rcl = 2;
          curRoom.memory.spawnNeedsUpdate = true;
      }else if(curRoom.memory.rcl === 4 && curRoom.memory.totalEnergy < 800){
          curRoom.memory.rcl = 3;
          curRoom.memory.spawnNeedsUpdate = true;
      }


      if(Boolean(curRoom.memory.energySource1) == false){
        if(curRoom.find(FIND_SOURCES_ACTIVE).length > 1){
          curRoom.memory.energySource1 = curRoom.controller.pos.findClosestByPath(FIND_SOURCES_ACTIVE).id;
          tempHold = curRoom.find(FIND_SOURCES_ACTIVE, {filter: (s) => { return ((s.id != curRoom.memory.energySource1)) } });
          curRoom.memory.energySource2 = tempHold[0].id;
          curRoom.memory.multipleEnergySource = true;
          if(tempHold[0].pos.findInRange(FIND_SOURCES_ACTIVE, 10)){
            curRoom.memory.sourcesClose = true;
          }else{
            curRoom.memory.sourcesClose = false;
          }
        }else{
          tempHold = curRoom.find(FIND_SOURCES_ACTIVE);
          curRoom.memory.energySource1 = nextSource[0].id;
          curRoom.memory.multipleEnergySource = false;
        }
      }

      if(Boolean(curRoom.memory.mineralSource) == false){
        tempHold = curRoom.find(FIND_MINERALS);
        curRoom.memory.mineralSource = tempHold[0].id;
        curRoom.memory.mineralType = tempHold[0].mineralType;
      }
      if(Boolean(curRoom.memory.mainSpawn) == false){
        tempHold = Game.getObjectById(curRoom.memory.energySource1);
        tempHold = tempHold.pos.findClosestByRange(FIND_STRUCTURES, {filter: function(s) {return s.structureType == STRUCTURE_SPAWN;}} );
        if(Boolean(tempHold)){
          curRoom.memory.mainSpawn = tempHold.id
          tempHold.memory.isMain = true;
          curRoom.memory.spawnNeedsUpdate = true;
        }else{
          curRoom.memory.mainSpawn = undefined
        }
      }
      if(Boolean(curRoom.memory.sourceContainer1) == false){
        tempHold = Game.getObjectById(curRoom.memory.energySource1);
        containerHold = curRoom.find(FIND_STRUCTURES, {filter: function(s) {return s.structureType == STRUCTURE_CONTAINER}});
        tempHold = tempHold.pos.findInRange(containerHold, 2);
        if(tempHold.length > 0){
          curRoom.memory.sourceContainer1 = tempHold[0].id;
          curRoom.memory.needsMaintenance = true;
          curRoom.memory.spawnNeedsUpdate = true;
        }else{
          curRoom.memory.sourceContainer1 = undefined;
        }
      }
      if(Boolean(curRoom.memory.energySource2) == true){
        if(Boolean(curRoom.memory.sourceContainer2) == false){
          tempHold = Game.getObjectById(curRoom.memory.energySource2);
          containerHold = curRoom.find(FIND_STRUCTURES, {filter: function(s) {return s.structureType == STRUCTURE_CONTAINER}});
          tempHold = tempHold.pos.findInRange(containerHold, 2);
          if(tempHold.length > 0){
            curRoom.memory.sourceContainer2 = tempHold[0].id;
            curRoom.memory.needsMaintenance = true;
            curRoom.memory.spawnNeedsUpdate = true;
          }else{
            curRoom.memory.sourceContainer2 = undefined;
          }
        }
      }

      if(Boolean(curRoom.memory.needsMaintenance) == false){
        tempHold = curRoom.find(FIND_STRUCTURES, {filter: function(s) {return (s.structureType == STRUCTURE_CONTAINER)||(s.structureType == STRUCTURE_ROAD)}});
        if(tempHold.length > 0){
          curRoom.memory.needsMaintenance = true;
          curRoom.memory.spawnNeedsUpdate = true;
        }


      }



      if(curRoom.controller.level >= 4){
                    if(Boolean(curRoom.memory.mainStorage) == false){
                      tempHold = curRoom.find(FIND_STRUCTURES, {filter: function(s) {return s.structureType == STRUCTURE_STORAGE;}} );
                      if(tempHold.length > 0){
                        curRoom.memory.mainStorage = tempHold[0].id;
                        curRoom.memory.spawnNeedsUpdate = true;
                      }else{
                        curRoom.memory.mainStorage = undefined;
                      }

                    }





      }



      if(curRoom.controller.level >= 6){
                    if(Boolean(curRoom.memory.roomTerminal) == false){
                      tempHold = curRoom.find(FIND_STRUCTURES, {filter: function(s) {return s.structureType == STRUCTURE_TERMINAL;}} );
                      if(tempHold.length > 0){
                        curRoom.memory.roomTerminal = tempHold[0].id;
                        curRoom.memory.spawnNeedsUpdate = true;
                      }else{
                        curRoom.memory.roomTerminal = undefined;
                      }
                    }
                    if(Boolean(curRoom.memory.mineralContainer) == false){
                      tempHold = Game.getObjectById(curRoom.memory.mineralSource);
                      containerHold = curRoom.find(FIND_STRUCTURES, {filter: function(s) {return s.structureType == STRUCTURE_CONTAINER}});
                      tempHold = tempHold.pos.findInRange(containerHold, 2);
                      if(tempHold.length > 0){
                        curRoom.memory.mineralContainer = tempHold[0].id;
                        curRoom.memory.spawnNeedsUpdate = true;
                      }else{
                        curRoom.memory.mineralContainer = undefined;
                      }
                    }


      }


      if(curRoom.controller.level >= 7){


                    if(Boolean(curRoom.memory.secondarySpawn) == false){
                      tempHold = curRoom.find(STRUCTURE_SPAWN, {filter: (s) => { return ((s.id != curRoom.memory.mainSpawn)) } })
                      if(tempHold.length > 0){
                        curRoom.memory.secondarySpawn = tempHold[0].id;
                        curRoom.memory.spawnNeedsUpdate = true;
                      }else{
                        curRoom.memory.secondarySpawn = undefined
                      }

                    }






      }



      curRoom.memory.wallStrength = 1000;



          // var hasChange = function(a, b)
          // {
          //   if(a.length!=b.length)
          //    return true;
          //   else
          //   {
          //   // comapring each element of array
          //    for(var i=0;i<a.length;i++){
          //     if(a[i]!=b[i]) {
          //       return true;
          //     }
          //   }
          //
          //   }
          // }
      //console.log(hasChange(startRoomMem, curRoom.memory));
      //console.log(Object.values(curRoom.memory));


      // if(Object.valueOf(startRoomMem) == (Object.valueOf(curRoom.memory))) {
      //
      //   console.log('sup dog')
      // }
      // else{
      //
      //   console.log('whoopsie');
      //
      // }





  }
}
