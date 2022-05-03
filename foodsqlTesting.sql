Insert Into Food(FoodName,Description,Caloric,ImageURL)
 OUTPUT INSERTED.ID
Values('Air-Fryer Pork Chops','crispy breaded air-fryer pork chops', 230,'' ) 


Insert into FoodSchedule(FoodId,date,UserProfileId,Meal)
 OUTPUT INSERTED.ID
 Values(,'2022-04-30',2,'Lunch')