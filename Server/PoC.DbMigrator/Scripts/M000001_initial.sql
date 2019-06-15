create table People
(
	Id int primary key identity (1,1),
	Name nvarchar(75) not null unique
)

create table Favourites
(
	Id int primary key identity (1,1),
	ImageId bigint,
	PeopleId int		
)