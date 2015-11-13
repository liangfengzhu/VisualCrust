//传入数据为KMLPlacemark；统一移动全部地壳单元
function UpliftCrustcells(kmlobject, tranalt) 
{ 
   var childobjType;

   if (kmlobject.getType() == 'KmlPlacemark') 
   {                     
                 var geometry = kmlobject.getGeometry();
                 
                 if (geometry) 
                 {
                    var kmlobjType = geometry.getType();
                   
                    switch (kmlobjType)
                    {
                     //move point 
                     case "KmlPoint":
                        var alti = geometry.getAltitude();                      
                        alti = alti + tranalt;                       
                        geometry.setAltitude( alti);  
                        break;
                       
                     //move line
                      case "KmlLineString":                       
                         var lineCoors = geometry.getCoordinates();
                         for (var i = 0; i < lineCoors.getLength(); i++) 
                         {
                            var lincoor = lineCoors.get(i);                           
                            var alti = lincoor.getAltitude();                           
                            alti = alti + tranalt;                       
                            lincoor.setAltitude( alti);                          
                            lineCoors.set(i, linecoor);
                         }
                          break;
                       
                       //move polygon
                       case "KmlPolygon":
                             var polyline = geometry.getOuterBoundary();
                             var lineCoors = polyline.getCoordinates();
                             for (var i = 0; i < lineCoors.getLength(); i++) 
                             {
                               var coor = lineCoors.get(i);                           
                               var alti = coor.getAltitude();                            
                               alti = alti + tranalt;                           
                               coor.setAltitude( alti);
                               lineCoors.set(i, coor);
                            }
                            break;
                        
                        //move KmlMultiGeometry
                        case "KmlMultiGeometry":
                          var container = geometry.getGeometries().getChildNodes();
                          var multiChild;
                          for (var i = 0; i < container.getLength(); i++) 
                          {
                            multiChild = container.item(i);              
                            childobjType = multiChild.getType();

                            switch (childobjType)
                            {
                              case  "KmlPoint":                                        
                                var alti = multiChild.getAltitude();                              
                                alti = alti + tranalt;                               
                                multiChild.setAltitude(alti);
                                break;

                               case  "KmlPolygon" :                         
                                var polyline = multiChild.getOuterBoundary();
                                var lineCoors = polyline.getCoordinates();
                                for (var j = 0; j < lineCoors.getLength(); j++) 
                                {
                                    var plinecoor = lineCoors.get(j);                                   
                                    var alti = plinecoor.getAltitude();
                                    alti = alti + tranalt;
                                    plinecoor.setAltitude(alti);
                                    lineCoors.set(j, plinecoor);                                    
                                }                            
                                break;
                                  
                                //multiChild.getType() == "KmlLineString" || multiChild.getType() == "KmlLinearRing"
                                default:                               
                                 var lineCoors = multiChild.getCoordinates();
                                 for (var j = 0; j < lineCoors.getLength(); j++) 
                                 {
                                    var linecoor = lineCoors.get(j);                                  
                                    var alti = linecoor.getAltitude();                                    
                                    alti = alti + tranalt;                                  
                                    linecoor.setAltitude( alti);
                                    lineCoors.set(j, linecoor);
                                 }
                                 break;

                             }//end: switch (childobjType) 
                         } //end: for (var i = 0; i < container.getLength(); i++)                    
                       break;
                    
                     default:
                       break;

                    }//end: switch (kmlobjType)
                } //end:if (geometry) 
   }  //end: if placemark

} //end: function UpliftCrustcells 
