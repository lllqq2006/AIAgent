using namespace std;
#include <string>
#include <iostream>
#include <algorithm>
#include <vector>
#include "atoi.h"

namespace LeetCode {

	int myatoi(std::string s)
	{
		char array[200] = { -1 };

		int step = 0;
		int currentIndex = 0;
		int currentCount = 0;
		for (int i = 0; i < s.length(); i++)
		{
			if (s[i] == ' ')
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
			if (step == 1 && (s[i] == '-' || s[i] == '+'))
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

	vector<vector<int>> threeSum(vector<int>& nums) {
		vector<vector<int>> result;
		std::sort(nums.begin(), nums.end());
		for (int i = 0; i <= nums.size() - 3; i++)
		{
			if (nums[i] > 0)
			{
				break;
			}

			if (i > 0 && nums[i] == nums[i - 1])
			{
				continue;
			}

			int start = i + 1, end = nums.size() - 1;

			while (start < end)
			{
				if (nums[i] + nums[start] + nums[end] == 0)
				{
					vector<int> temp = { nums[i], nums[start], nums[end] };
					result.push_back(temp);
					while (start < end && nums[start] == nums[start + 1])
					{
						start++;
					}
					while (start < end && nums[end] == nums[end - 1])
					{
						end--;
					}
					start++;
					end--;
				}
				else if (nums[i] + nums[start] + nums[end] > 0)
				{
					end--;
				}
				else
				{
					start++;
				}
			}
		}
		return result;

	}

	vector<vector<int>> fourSum(vector<int>& nums, int target) {
		std::sort(nums.begin(), nums.end());

		vector<vector<int>> result;

		for (int i = 0;i < nums.size() -3; i++) {
			if (i > 0 && nums[i] == nums[i - 1])
			{
				continue;
			}
			for (int j = i + 1; j < nums.size() - 2; j++)
			{
				if (j > i + 1 && nums[j] == nums[j - 1])
				{
					continue;
				}

				int start = j + 1, end = nums.size() - 1;
				while (start < end)
				{
					int tempT = target - nums[i] - nums[j];
					int tempSum = nums[start] + nums[end];
					if (tempSum == tempT)
					{
						result.push_back({ nums[i], nums[j], nums[start], nums[end] });
						while (start < end && nums[start] == nums[start + 1])
						{
							start++;
						}
						while (start < end && nums[end] == nums[end - 1])
						{
							end--;
						}
						start++;
						end--;
					}
					else if (tempSum > tempT)
					{
						end--;
					}
					else
					{
						start++;
					}
				}
			}
		}
		return result;
	}

	int lengthOfLongestSubstring(std::string s) {
		int start = 0, end = 1;
		int maxlength = 0;
		int n = s.length();
		if (s.length() == 0)
		{
			return 0;
		}
		if (s.length() == 1)
		{
			return 1;
		}
		while (end < n)
		{
			if (start == end)
			{
				end++;
				maxlength = std::max(maxlength, end - start);
			}
			else
			{
				for (int i = start; i < end; i++)
				{
					if (s[i] == s[end])
					{
						start = i + 1;
						break;
					}
				}
				end++;
				maxlength = std::max(maxlength, end - start);
			}
		}

		return maxlength;
	}

	//43
	string multiply(string num1, string num2) {
		string results;
		int m = num1.length();
		int n = num2.length();
		vector<int> pos(m + n, 0);

		for (int i = m - 1; i >= 0; i--)
		{
			for (int j = n - 1; j >= 0; j--) {
				int mul = (num1[i] - '0') * (num2[j] - '0');
				int p1 = i + j, p2 = i + j + 1;
				int sum = mul + pos[p2];
				pos[p2] = sum % 10;
				pos[p1] = sum / 10 + pos[p1];
			}

		}
		for (int i = 0; i < m + n; i++)
		{
			if (results.empty() && pos[i] == 0)
			{
				continue;
			}
			results += pos[i] + '0';
		}
		return results;
	}

	string longestPalindrome(string s) {
		int finalMax = 0;
		string finalResult = "";

		for (int i = 0; i < s.length(); i++)
		{
			int left = i;
			int right = i;
			while (left >= 0 && right <= s.length() - 1 && s[left] == s[right])
			{
				left--;
				right++;
			}
			if (right - left - 1 > finalMax)
			{
				finalMax = right - left - 1;
				finalResult = s.substr(left + 1, finalMax);
			}

			if (i + 1 < s.length() && s[i] == s[i + 1])
			{
				int left = i;
				int right = i + 1;
				while (left >= 0 && right <= s.length() - 1 && s[left] == s[right])
				{
					left--;
					right++;
				}
				if (right - left - 1 > finalMax)
				{
					finalMax = right - left - 1;
					finalResult = s.substr(left + 1, finalMax);
				}

			}

		}
		return finalResult;
	}

	string longestPalindrome2(string s) {
		std::string str = "";
		for (uint32_t i = 0; i < s.size(); ++i) {
			str += "#";
			str += s[i];
		}
		str += "#";
		int max_length = 0;
		std::string res;
		for (uint32_t i = 0; i < str.size(); ++i) {
			int left = i, right = i;
			while (left >= 0 && right < str.size() && str[left] == str[right]) {
				left--;
				right++;
			}
			int cur_length = right - left - 1;
			if (cur_length > max_length) {
				max_length = cur_length;
				res.clear();
				for (uint32_t j = left + 1; j < right; ++j) {
					if (str[j] != '#') {
						res.push_back(str[j]);
					}
				}
			}
		}
		return res;
	}

	string longestPalindrome3(string s)
	{
		if (s.size() < 2)
		{
			return s;
		}
		vector<vector<bool>> dp(s.size(), vector<bool>(s.size(), false));
		for (int i = 0; i < s.size(); i++)
		{
			dp[i][i] = true;
		}

		int start = 0;
		int maxLength = 1;

		for (int l = 2; l <= s.size(); l++)
		{
			for (int i = 0; i <= s.size() - l; i++)
			{
				int j = i + l - 1;
				if (j >= s.size())
				{
					break;
				}
				if (s[i] == s[j])
				{
					if (l == 2 || dp[i + 1][j - 1])
					{
						dp[i][j] = true;
						if (l > maxLength)
						{
							start = i;
							maxLength = l;
						}
					}
				}
				else
				{
					dp[i][j] = false;
				}
			}
		}

		return s.substr(start, maxLength);

	}
	int minDistance(string word1, string word2) {
		vector<vector<int>> dp(word1.size() + 1, vector<int>(word2.size() + 1, 0));
		for (int i = 0; i < word1.size() + 1; i++)
		{
			dp[i][0] = i;
		}
		for (int j = 0; j < word2.size() + 1; j++)
		{
			dp[0][j] = j;
		}

		for (int i = 1; i < word1.size() + 1; i++)
		{
			for (int j = 1; j < word2.size() + 1; j++)
			{
				if (word1[i - 1] == word2[j - 1])
				{
					dp[i][j] = dp[i - 1][j - 1];
				}
				else
				{
					dp[i][j] = min({ dp[i - 1][j - 1] , dp[i - 1][j], dp[i][j - 1] }) + 1;
				}
			}
		}
		return dp[word1.size()][word2.size()];
	}


}

class Node {
public:
	bool isLeaf;
	vector<Node*> children;

	Node() : isLeaf(false), children(26, nullptr) {}
	~Node() {
		for (auto child : children) {
			delete child;
		}
	}
};

class Trie {
private:
	Node* root;

public:
	Trie() {
		root = new Node();
	}

	void insert(string word) {
		Node* current = root;
		for (int i = 0; i < word.size(); i++)
		{
			int currentIndex = word[i] - 'a';
			if (current->children[currentIndex] == nullptr)
			{
				current->children[currentIndex] = new Node();
			}
			current = current->children[currentIndex];
		}
		current->isLeaf = true;
	}

	bool search(string word) {
		bool found = false;
		Node* current = root;
		for (int i = 0; i < word.size(); i++)
		{
			int currentIndex = word[i] - 'a';
			if (current->children[currentIndex] == nullptr)
			{
				return false;
			}
			else {
				current = current->children[currentIndex];
			}
		}
		if (current->isLeaf)
		{
			found = true;
		}
		return found;
	}

	bool startsWith(string prefix) {
		Node* current = root;
		for (int i = 0; i < prefix.size(); i++)
		{
			int currentIndex = prefix[i] - 'a';
			if (current->children[currentIndex] == nullptr)
			{
				return false;
			}
			else {
				current = current->children[currentIndex];
			}
		}
		return true;
	}

	int nextGreaterElement(int n) {
		if (n < 12)
		{
			return -1;
		}
		int origin = n;
		vector<int> digits;
		while (n > 0)
		{
			digits.push_back(n % 10);
			n /= 10;
		}

		int l = -1;
		for (int i = 0; i < digits.size() - 1; i++)
		{
			if (digits[i] > digits[i + 1])
			{
				l = i + 1;
				break;
			}
		}

		if (l == -1)
		{
			return -1;
		}

		reverse(digits.begin(), digits.begin() + l);

		for (int i = l - 1; i >= 0; i--)
		{
			if (digits[i] > digits[l])
			{
				swap(digits[i], digits[l]);
				break;
			}
		}

		long long result = 0;;
		for (int i = digits.size() - 1; i >= 0; i--)
		{
			result = result * 10 + digits[i];
		}

		return result;

	}
};
