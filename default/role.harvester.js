

module.exports ={




  run: function(creep, cRoom){

    var testRun = global.main[creep.memory.homeRoom]

    //console.log(testRun.sexyStuff.length)

    var source;
    var storageStructure;
    var linkStructure;
    var hasTarget;
    var target;

    var energyToFull =creep.carryCapacity - _.sum(creep.carry);
    if(creep.memory.hasMinerals != true){
      var theWorks = (creep.body.length-2)*2;
    }else{
      theWorks = (creep.body.length-4);
    }




      if(creep.memory.working != false && _.sum(creep.carry) ==0){creep.memory.working = false;}
      else if(creep.memory.working != true && ((_.sum(creep.carry) == creep.carryCapacity)|| ((energyToFull< theWorks)))) {
      //console.log(_.sum(creep.carry));
      creep.memory.working = true;}



      if(creep.memory.working == true){

        //CHECK PREVIOUS TARGET
        if(Boolean(creep.memory.workTarget)){
          target = Game.getObjectById(creep.memory.workTarget);
          if((target.structureType == STRUCTURE_SPAWN)||
          (target.structureType == STRUCTURE_EXTENSION)) {

            if(target.energy < target.energyCapacity){
              creep.memory.previousTarget = true;
              creep.memory.targetType = 'spawn';
            }else{
              creep.memory.previousTarget = false;
              creep.memory.workTarget = undefined;
              creep.memory.targetType = undefined;
            }
          }else if((target.structureType == STRUCTURE_CONTAINER)||
          (target.structureType == STRUCTURE_STORAGE)){
            if(_.sum(target.store) < target.storeCapacity){
              creep.memory.previousTarget = true;
              creep.memory.targetType = 'store';
            }else{
              creep.memory.previousTarget = false;
              creep.memory.workTarget = undefined;
              creep.memory.targetType = undefined;

            }
          }
        }

        if((creep.memory.isStationary != true)){

          if(((creep.memory.previousTarget != true)||(Boolean(target)!= true)||
          (((creep.memory.previousTarget == true)&&(creep.memory.targetType == 'store'))))) {

            target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (structure) =>
            { return (((structure.structureType == STRUCTURE_SPAWN)||(structure.structureType == STRUCTURE_EXTENSION))
            && (structure.energy < structure.energyCapacity)) } })

          }

          if((Boolean(target)!=true)&&(creep.memory.hasStation == true)){

            var stationStore = Game.getObjectById(creep.memory.stationaryStore);
            if((stationStore != undefined)&& stationStore.structureType == STRUCTURE_CONTAINER){
              if(_.sum(stationStore.store) < stationStore.storeCapacity){
                target = stationStore;
              }
            }

          }

          if((Boolean(target)!=true)&&(creep.memory.storageBlock != undefined)) {
            storageStructure = Game.getObjectById(creep.memory.storageBlock)
            if(_.sum(storageStructure.store) < storageStructure.storeCapacity){
              target = storageStructure;
            }
          }

          if((Boolean(target)!=true)) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) =>
            { return ((structure.structureType == STRUCTURE_CONTAINER)
            && (_.sum(structure.store) < structure.storeCapacity)) } })
          }

          if (Boolean(target)==true){
            if(creep.memory.hasMinerals != true){
              if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
              }
              creep.memory.workTarget = target.id;
             }else{
               console.log(creep.memory.resourceType);
               if(creep.transfer(target, creep.memory.resourceType) == ERR_NOT_IN_RANGE){
                 creep.moveTo(target)
               }
               creep.memory.workTarget = target.id;
            }

          }
        }






        //IF CREEP IS STATIONARY HERE, JESUS CHRIST DUDE
        else{
          //console.log("stuck here" + creep.room + "    - " + creep.name);
          if((creep.memory.hasStation == true)){

            var stationStore = Game.getObjectById(creep.memory.stationaryStore);
            if((stationStore != undefined)&& stationStore.structureType == STRUCTURE_CONTAINER){
              if(stationStore.store.energy < stationStore.storeCapacity){
                target = stationStore;
              }
            }

          }
          if (Boolean(target)==true){
            if(creep.memory.hasMinerals != true){
              if(creep.transfer(target, RESOURCE_ENERGY)== ERR_NOT_IN_RANGE){
                creep.moveTo(target)
              }
              creep.memory.workTarget = target.id;
             }else{
               creep.transfer(target, creep.memory.resourceType);
               creep.memory.workTarget = target.id;
            }


          }

        }
      }






      else{
          if(source != Game.getObjectById(creep.memory.sourceBlock)){
            source = Game.getObjectById(creep.memory.sourceBlock)
            if(creep.memory.hasMinerals == true){

              creep.memory.resourceType = source.mineralType;
            }
          }
          // if(creep.memory.hasMinerals == true){
          //   creep.moveTo(source);
          // console.log(source);
          // }

          if(creep.harvest(source) == ERR_NOT_IN_RANGE){

            creep.moveTo(source);
          }
        }


    }
  }
