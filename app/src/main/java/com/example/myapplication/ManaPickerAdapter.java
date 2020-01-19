package com.example.myapplication;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.viewpager.widget.PagerAdapter;
import java.util.List;

public class ManaPickerAdapter extends PagerAdapter {


    private List<ManaListItem> models;
    private LayoutInflater layoutInflater;
    private Context mContext;


    public ManaPickerAdapter(List<ManaListItem> models, Context mContext) {
        this.models = models;
        this.mContext = mContext;
    }

    @Override
    public int getCount() {
        return models.size();
    }

    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
        return view.equals(object);
    }

    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, int position) {

        layoutInflater = LayoutInflater.from(mContext);
        View view = layoutInflater.inflate(R.layout.mana_item,container,false);
        ImageView manaImg = view.findViewById(R.id.manaItemImg);
        TextView manaType = view.findViewById(R.id.manaItemTxt);
        TextView manaPrice = view.findViewById(R.id.manaItemPriceTxt);

        manaImg.setImageResource(models.get(position).getManaImg());
        manaType.setText(models.get(position).getType());
        manaPrice.setText(models.get(position).getPrice());

        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });

        container.addView(view,0);
        return view;

    }

    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
        container.removeView((View)object);
    }
}
