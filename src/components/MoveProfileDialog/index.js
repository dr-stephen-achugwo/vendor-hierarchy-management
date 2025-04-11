

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { moveVendor } from "@/redux/vendorSlice";

const MoveProfileDialog = ({ open, onOpenChange, vendor }) => {
  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => state.vendors);
  const [selectedOption, setSelectedOption] = useState("changeParent");
  const [selectedParent, setSelectedParent] = useState(null);

  // Get the current parent vendor
  const currentParent = vendors.find((v) => v.id === vendor.parentId);
  
  // Get regional vendors excluding the current parent
  const regionalVendors = vendors.filter((v) => v.level === "Regional" && v.id !== vendor.parentId);

  const handleMove = () => {
    if (selectedOption === "changeParent" && selectedParent) {
      dispatch(moveVendor({ id: vendor.id, newParentId: selectedParent }));
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger />
      <DialogContent>
        <DialogTitle>Move {vendor.name}</DialogTitle>

        <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="flex space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="changeParent" />
            <label>Change Parent</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="changeRole" />
            <label>Change Role</label>
          </div>
        </RadioGroup>

        {selectedOption === "changeParent" && (
          <>
            {/* Display Current Parent Name */}
            {currentParent && (
              <p className="text-sm text-gray-700">
                Current Parent: <span className="font-semibold">{currentParent.name}</span>
              </p>
            )}

            <p className="text-sm text-gray-500">Move group vendor under a different site admin</p>

            <Select onValueChange={setSelectedParent}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select Site Admin" />
              </SelectTrigger>
              <SelectContent>
                {regionalVendors.map((rv) => (
                  <SelectItem key={rv.id} value={rv.id}>{rv.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-2 p-2 border border-gray-300 bg-gray-100 rounded-md text-sm text-gray-600">
              <p>All sub-vendors and deployment associates under this group vendor will also be moved under the site admin</p>
            </div>
          </>
        )}

        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleMove} disabled={selectedOption === "changeParent" && !selectedParent}>
            Move
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoveProfileDialog;
