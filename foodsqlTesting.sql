Insert Into Food(FoodName,Description,Caloric,ImageURL)
 OUTPUT INSERTED.ID
Values('Air-Fryer Pork Chops','crispy breaded air-fryer pork chops', 230,'' ) 
SELECT @@IDENTITY 

Insert into FoodSchedule(FoodId,date,UserProfileId,Meal)
 OUTPUT INSERTED.ID
 Values((Select id from food as FoodId Where id=@@IDENTITY ),'2022-04-30',2,'Lunch')