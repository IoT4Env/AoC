#include <bits/stdc++.h>
#include <iostream>
#include <functional>
#include <algorithm>
#include <array>

using namespace std;

template<typename T>
class handle_file
{
private:
    string file_name;
    ifstream file;

    //Double or single underscores to identify private methods
    void __close();
    bool _is_open();

public:
    handle_file(string);
    int open(std::ios_base::openmode);
    T process(function<T (ifstream&)>);
};

//Constructor
template<typename T>
handle_file<T>::handle_file(string file_name){
    this->file_name = file_name;
}

template<typename T>
int handle_file<T>::open(std::ios_base::openmode mode){
    //Open file in read only mode
    this->file.open(this->file_name, mode);

    if(!this->_is_open()){
        cerr << "Error opening the provided file";
        return -1;
    }

    return 0;
}

template<typename T>
T handle_file<T>::process(function<T (ifstream&)> processor){
    try
    {
        //Expect the file to be already opened since it required a mode argument
        if(!this->_is_open()){
            throw std::runtime_error("The file is not open.\nPlease open it by calling the __open method of this object before processing");
        }

        //Do something with the file.
        T processed = processor(this->file);

        //Close file after processing it.
        this->__close();
        return processed;
    }
    catch(const std::exception& error)
    {
        std::cerr << error.what() << '\n';
        this->__close();
        return NULL;
    }
}

template<typename T>
bool handle_file<T>::_is_open(){
    return this->file.is_open();
}

template<typename T>
void handle_file<T>::__close(){
    if(this->_is_open()){
        this->file.close();
    }
}


int total_rows = 1000;

int** get_columns_in_file(ifstream&);
unsigned long get_total_difference(int*, int*);

int main()
{
    handle_file<int**> input_file("input1.txt");

    //Open file in read only mode
    input_file.open(std::ios::in);

    //Process the file
    int** matrix = input_file.process(get_columns_in_file);
    
    //Sort columns in ascending order
    sort(matrix[0], matrix[0] + total_rows);
    sort(matrix[1], matrix[1] + total_rows);

    unsigned long difference = get_total_difference(matrix[0], matrix[1]);
    // Long unsigned format
    printf("%lu\n", difference);

    return 0;
}

unsigned long get_total_difference(int* column1, int* column2){
    unsigned long sum = 0;

    for(int i = 0; i < total_rows; i++ ){
        sum += abs(column1[i] - column2[i]);
    }

    return sum;
}

// int** => Array of integer array return type
int** get_columns_in_file(ifstream& file){
    int* column1 = new int[total_rows];
    int* column2 = new int[total_rows];

    int** matrix = new int* [total_rows];

    string row;
    int iteration = 0;
    while(getline(file, row)){
        if(row == ""){//Skip trailing new lines
            continue;
        }

        const int offset = 6;
        column1[iteration] = stoi(row);
        column2[iteration] = stoi(row.substr(offset));
        
        iteration++;
    }

    matrix[0] = column1;
    matrix[1] = column2;
    return matrix;
}
