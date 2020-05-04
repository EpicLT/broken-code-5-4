

module.exports ={
  run: function(creep,cRoom){

    var storageStructure;
    var linkStructure;
    var source;

    if(creep.memory.working != false && _.sum(creep.carry) == 0){creep.memory.working = false;}
    else if(creep.memory.working != true && ((_.sum(creep.carry) == creep.carryCapacity))) {
    //console.log(_.sum(creep.carry));
    creep.memory.working = true;}



      if(creep.memory.working == true) {

        if(Boolean(creep.memory.workTarget)){
          var target = Game.getObjectById(creep.memory.workTarget);
          if((target.structureType == STRUCTURE_TERMINAL)){
            if(target.store.energy < (target.storeCapacity-5000)){
              creep.memory.previousTarget = true;
              creep.memory.targetType = 'store';
            }else{
              creep.memory.previousTarget = false;
              creep.memory.workTarget = undefined;
              creep.memory.targetType = undefined;
              target = undefined;

            }
          }
        }


        if(Boolean(creep.memory.terminalBlock)){
          target = Game.getObjectById(creep.memory.terminalBlock)
        }





        if (Boolean(target)){
          if(creep.transfer(target, creep.memory.resourceType) == ERR_NOT_IN_RANGE){
            creep.moveTo(target);
            creep.memory.workTarget = target.id;
          }
        }







      }

      else{


        if(Boolean(creep.memory.supply) == true){

          var theSupply = Game.getObjectById(creep.memory.supply);
          if((_.sum(theSupply.store)) > (theSupply.storeCapacity/2)){
            source = theSupply
          }
        }
        //console.log(source);



        if(Boolean(source) != false){
          if(creep.withdraw(source, creep.memory.resourceType) == ERR_NOT_IN_RANGE){

            creep.moveTo(source);
          }
        }






      }




  }
}
