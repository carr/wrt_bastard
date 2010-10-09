/**
 * Copyright (c) 2009-2010 Symbian Foundation and/or its subsidiary(-ies).
 * All rights reserved.
 * This component and the accompanying materials are made available
 * under the terms of the License "Eclipse Public License v1.0"
 * which accompanies this distribution, and is available
 * at the URL "http://www.eclipse.org/legal/epl-v10.html".
 *
 * Initial Contributors:
 * Nokia Corporation - initial contribution.
 * 
 * Contributors:
 * 
 * Description:
 * 
 */

/*
	Function 	:	MenuItem()
	Argument	:	Void
	Returns		:	Void
	Description	:	Constructor Function creates a Menu object to the WINDOW
*/

function MenuItem(name, id)
{
	this.id = id;
	this.name = name;
	this.isDimmed = false;
	
	this.items = [];
	this.index = null;
	this.parent = null;
	this.type = 'MenuItem';
	
	
	//	Event triggers
	this.onSelect = null;
}


/*
	Function 	:	MenuItem.append(MenuItem)
	Argument	:	Menu Object
	Returns		:	Void
	Description	:	Function appends childMenuItem to a MenuItem
*/
MenuItem.prototype.append = function(childMenuItem)
{
	if( (childMenuItem != null) && (childMenuItem.type == 'MenuItem'))
	{
		childMenuItem.parent = this;
		this.items[childMenuItem.id] = childMenuItem;
	}
}


/*
	Function 	:	MenuItem.remove()
	Argument	:	Menu Object
	Returns		:	Void
	Description	:	Function Removes childMenuItem and its children from the parent menu item.
*/
MenuItem.prototype.remove = function(childMenuItem)
{
	if((childMenuItem != null) && (childMenuItem.type == 'MenuItem'))
	{
		var i = this.search(childMenuItem);
		if(i > -1)
			this.items.splice(i, 1);
	}
}

/*
	Function 	:	MenuItem.remove()
	Argument	:	Menu Object
	Returns		:	Void
	Description	:	If flag is true the MenuItem is hidden and if flag is false the item is shown.
*/
MenuItem.prototype.setDimmed = function(flag)
{
	this.isDimmed = flag;
}


/*
	Function 	:	MenuItem.search()
	Argument	:	MenuItem Object
	Returns		:	Integer
	Description	:	Function Replace oldMenuItem with newMenuItem
*/
MenuItem.prototype.search = function(MenuItem)
{
		var flag = false;
		for(var i in this.items)
		{
			if(this.items[i].id == MenuItem.id)
			{	
				flag = true; 
				break; 
			}
		}
		if(flag)
			return i;
		else
			return -1;		
}

//	make TRUE menuItem.js script loaded
window.parent.NOKIA.scriptsLoaded.menuItem = true;
