# Returns a contigous array of numbers (removing '\n's and consecutive spaces)
input1=($(cat input1.txt))

column1=()
column2=()

index=0

# '@' means all elements in array
for element in "${input1[@]}";

# Saves in different columns as in the original file input (even index for first column, odd index for second column)
    do if [ $(($index % 2)) -eq 0 ]; 
    then
        column1+=($element)
    else
        column2+=($element)

    fi

    ((index+=1))

done


# Sorting columns
sortedColumn1=($(echo "${column1[@]}" | tr ' ' '\n' | sort))
sortedColumn2=($(echo "${column2[@]}" | tr ' ' '\n' | sort))


totalDifference=0
index=0
for element in "${sortedColumn1[@]}"
    do 
    difference=$((element - ${sortedColumn2[index]}))

    # Adding the absolute value of difference
    ((totalDifference+=${difference#-}))
    ((index+=1))

done

echo $totalDifference
