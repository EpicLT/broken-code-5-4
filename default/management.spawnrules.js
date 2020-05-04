module.exports ={
  run: function(theSpawn, spawnRoom){
    var theSpawnEnergy = spawnRoom.memory.totalEnergy;
    var controllerLevel = spawnRoom.memory.rcl;


    console.log(theSpawn + "     " + controllerLevel);



//RCL 1


    if((controllerLevel == 1)|| (spawnRoom.energyCapacityAvailable < 450)) {
        theSpawn.memory.roomTier = 1;
      if(Boolean(spawnRoom.memory.sourceContainer1) == true){
        theSpawn.memory.minimumHarvesters = 3;
        if(Math.floor(spawnRoom.energyCapacityAvailable) > 300){
          theSpawn.memory.HarvesterEnergy = 300;}
      }else{
        theSpawn.memory.minimumHarvesters = 2;
        if(Math.floor(spawnRoom.energyCapacityAvailable) > 200){
          theSpawn.memory.HarvesterEnergy = 200;}
      }


        theSpawn.memory.minimumMineralHarvesters = 0;
        theSpawn.memory.minimumMarketFillers = 0;

      theSpawn.memory.minimumUpgraders = 4;
        theSpawn.memory.UpgraderEnergy = 200;

        if(spawnRoom.memory.needsMaintenance == true) {
          theSpawn.memory.minimumMaintenance = 1;
        }else{
          theSpawn.memory.minimumMaintenance = 0;
        }





      theSpawn.memory.minimumStorageFillers = 0;
      if(Boolean(spawnRoom.memory.sourceContainer1) == true){
        theSpawn.memory.minimumSpawnFillers = 1;
      }else if(Boolean(spawnRoom.memory.sourceContainer2) == true){
        theSpawn.memory.minimumSpawnFillers = 2;
      }else{
        theSpawn.memory.minimumSpawnFillers = 0;
      }
      theSpawn.memory.minimumBuilders = 2;
          theSpawn.memory.BuilderEnergy = 200;
      theSpawn.memory.minimumWallers = 0;
    }



//RCL 2

    if((controllerLevel == 2)&& (spawnRoom.energyCapacityAvailable >= 450)) {
        theSpawn.memory.roomTier = 2;
      if(Boolean(spawnRoom.memory.sourceContainer1) == true){
        theSpawn.memory.minimumHarvesters = 3;
          theSpawn.memory.HarvesterEnergy = 400;
      }else{
        theSpawn.memory.minimumHarvesters = 3;
          theSpawn.memory.HarvesterEnergy = 400;
      }

      theSpawn.memory.minimumMineralHarvesters = 0;
      theSpawn.memory.minimumMarketFillers = 0;

      theSpawn.memory.minimumUpgraders = 3;
        theSpawn.memory.UpgraderEnergy = 400;

        if(spawnRoom.memory.needsMaintenance == true) {
          theSpawn.memory.minimumMaintenance = 1;
        }else{
          theSpawn.memory.minimumMaintenance = 0;
        }




        let roomContainers = spawnRoom.find(FIND_STRUCTURES, {filter: function(s) {return s.structureType == STRUCTURE_CONTAINER;}} )
        console.log(roomContainers.length);
        if(roomContainers.length > 2){
          theSpawn.memory.minimumStorageFillers = 1;

        }else{
          theSpawn.memory.minimumStorageFillers = 0;
        }

      theSpawn.memory.FillerEnergy = 300;
      if(Boolean(spawnRoom.memory.sourceContainer1) == true){
        theSpawn.memory.minimumSpawnFillers = 1;

      }else if(Boolean(spawnRoom.memory.sourceContainer2) == true  && (spawnRoom.memory.sourcesClose != true)) {
        theSpawn.memory.minimumSpawnFillers = 2;

      }else{
        theSpawn.memory.minimumSpawnFillers = 0;
      }


      theSpawn.memory.minimumBuilders = 2;
          theSpawn.memory.BuilderEnergy = 400;
      theSpawn.memory.minimumWallers = 1;
    }




//RCL 3

        if((controllerLevel == 3)&& (spawnRoom.energyCapacityAvailable >= 600)) {
            theSpawn.memory.roomTier = 3;
          theSpawn.memory.minimumHarvesters = 3;
            theSpawn.memory.HarvesterEnergy = 600;

          theSpawn.memory.minimumMineralHarvesters = 0;
          theSpawn.memory.minimumMarketFillers = 0;

          theSpawn.memory.minimumUpgraders = 2;
            theSpawn.memory.UpgraderEnergy = 600;


          theSpawn.memory.minimumMaintenance = 1;
            theSpawn.memory.MaintenanceEnergy = 400;







            let roomContainers = spawnRoom.find(FIND_STRUCTURES, {filter: function(s) {return s.structureType == STRUCTURE_CONTAINER;}} )
            console.log(roomContainers.length);
            if(roomContainers.length > 2){
              theSpawn.memory.minimumStorageFillers = 1;

            }else{
              theSpawn.memory.minimumStorageFillers = 0;
            }



          theSpawn.memory.FillerEnergy = 300;
          if(Boolean(spawnRoom.memory.sourceContainer1) == true){
            theSpawn.memory.minimumSpawnFillers = 1;
          }else if(Boolean(spawnRoom.memory.sourceContainer2) == true){
            theSpawn.memory.minimumSpawnFillers = 2;
          }else{
            theSpawn.memory.minimumSpawnFillers = 0;
          }
          theSpawn.memory.minimumBuilders = 2;
              theSpawn.memory.BuilderEnergy = 400;
          theSpawn.memory.minimumWallers = 1;
        }

//RCL 4

                if((controllerLevel == 4)&& (spawnRoom.energyCapacityAvailable >= 800)) {
                    theSpawn.memory.roomTier = 4;
                  theSpawn.memory.minimumHarvesters = 2;
                  theSpawn.memory.HarvesterEnergy = 800;

                theSpawn.memory.minimumMineralHarvesters = 0;
                theSpawn.memory.minimumMarketFillers = 0;



                  theSpawn.memory.minimumUpgraders = 2;
                    theSpawn.memory.UpgraderEnergy = 600;


                  theSpawn.memory.minimumMaintenance = 1;
                    theSpawn.memory.MaintenanceEnergy = 400;





                  theSpawn.memory.minimumStorageFillers = 1;
                  theSpawn.memory.FillerEnergy = 300;

                  if(spawnRoom.memory.sourcesClose != true){
                    theSpawn.memory.minimumSpawnFillers = 2;
                  }else{
                    theSpawn.memory.minimumSpawnFillers = 1;
                  }

                  theSpawn.memory.minimumBuilders = 1;
                      theSpawn.memory.BuilderEnergy = 600;
                  theSpawn.memory.minimumWallers = 1;
                }


if((controllerLevel == 5)){
  theSpawn.memory.roomTier = 5;
}


//RCL 6

    if(controllerLevel >= 6){
        theSpawn.memory.roomTier = 6;
      theSpawn.memory.minimumHarvesters = 2;
      theSpawn.memory.HarvesterEnergy = 700
      if(Boolean(spawnRoom.memory.roomTerminal) == true){
        theSpawn.memory.minimumMineralHarvesters = 1;
        theSpawn.memory.minimumMarketFillers = 1;

      }else{
        theSpawn.memory.minimumMineralHarvesters = 0;
        theSpawn.memory.minimumMarketFillers = 0;
      }

      theSpawn.memory.minimumUpgraders = 2;
        theSpawn.memory.UpgraderEnergy = 800
      theSpawn.memory.minimumMaintenance = 1;
        theSpawn.memory.MaintenanceEnergy = 400;
      theSpawn.memory.minimumStorageFillers = 1;
      theSpawn.memory.FillerEnergy = 500;

      if(spawnRoom.memory.sourcesClose != true){
        theSpawn.memory.minimumSpawnFillers = 2;
      }else{
        theSpawn.memory.minimumSpawnFillers = 1;
      }

      theSpawn.memory.minimumBuilders = 2;
        theSpawn.memory.BuilderEnergy = 600;
      theSpawn.memory.minimumWallers = 1;



    }







  }
}
