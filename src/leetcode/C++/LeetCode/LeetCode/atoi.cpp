using namespace std;
#include <string>
#include <iostream>
#include "atoi.h"

int myatoi(std::string s)
{
	char array[200] = {-1};

	int step = 0;
	int currentIndex = 0;
	int currentCount = 0;
	for(int i = 0; i < s.length(); i++)
	{
		if(s[i] == ' ')
		{
			continue;
		}
		else
		{
			currentIndex = i;
			break;
		}
	}
	step = 1;

	for (int i = currentIndex; i < s.length(); i++)
	{
		if (step == 1 &&(s[i] == '-' || s[i] == '+'))
		{
			step = 2;
			array[currentCount] = s[i];
			currentCount++;
		}
		else if (s[i] >= '0' && s[i] <= '9')
		{
			if (step == 1)
			{
				step = 2;
			}
			array[currentCount] = s[i];
			currentCount++;
		}
		else
		{
			break;
		}
	}

	for (int i = 0; i < currentCount; i++)
	{
		cout << array[i] << endl;
	}
	
	int sum = 0;
	int presum = 0;
	bool overlimit = false;
	for (int i = 0; i < currentCount; i++)
	{
		if ((array[i] == '-' || array[i] == '+'))
		{
			continue;
		}
		sum = sum * 10 + (array[i] - '0');
		
	}

	return sum;
}